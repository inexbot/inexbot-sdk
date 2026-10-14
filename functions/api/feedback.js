/**
 * EdgeOne Pages Function —— POST /api/feedback
 * ============================================================
 * 「无秘密端点」：本文件与最终 URL 都是公开的，**不含任何凭据**。
 *   限流（每 IP 每 10 分钟上限，**实例内尽力而为**）+ 体积上限 + 载荷白名单提取纯文本
 *   + 关键词门槛（正文须含「反馈」/feedback，零成本反垃圾；与钉钉关键词策略对齐）
 *   → 转发到服务端环境变量配置的群机器人 webhook（钉钉/飞书）
 *     · 转发**同步等待最多 8s**：正常几十~几百毫秒返回，客户端可据此**确证送达**；
 *       超时则用 `ctx.waitUntil`（EdgeOne 提供的平台能力）在后台完成并回 `forwarded(pending)`，
 *       避免边缘函数长时间挂住；客户端把 pending 视为"未确认"（走兜底）
 *     · 限流取 IP 优先用 **平台可信 IP** `ctx.eo.clientIp`（比 x-forwarded-for 稳）
 *   → 无论是否配置 webhook，都会写一条日志（可在 EdgeOne 控制台实时日志查看）
 *
 * 环境变量（在 EdgeOne Pages 控制台 → 项目设置 → 环境变量 里配，**绝不进客户端**）：
 *   读取载体（实测结论）：**优先 `ctx.env`** —— EdgeOne Pages Functions 把控制台变量
 *   注入在 **handler 参数的 env 属性**上，**不在 `process.env`**（后者实测为空对象）；
 *   兼容顺序：ctx.env → ctx.context.env → request.eo.env → process.env
 *   FEEDBACK_WEBHOOK     群机器人完整 webhook（钉钉/飞书；缺省＝只记日志）
 *   DINGTALK_TOKEN       也可只配 token（惯例：地址写代码、密钥放 env）→ 代码拼
 *                        https://oapi.dingtalk.com/robot/send?access_token=<token>
 *   FEISHU_WEBHOOK       飞书群机器人 webhook（可选）
 *   FEEDBACK_RATE_MAX    可选：每 IP / 10 分钟上限，默认 5
 *   FEEDBACK_SIZE_MAX    可选：请求体字节上限，默认 16384
 *
 * 约定：
 *   - POST 请求体可为 JSON（{"msgtype":"text","text":{"content":"…"}} /
 *     {"msg_type":"text","content":{"text":"…"}} / {"text":"…"} / {"message":"…"}）或纯文本。
 *   - 只接收、只存档/转发；**不自动建 Issue、不自动广播给任何人、不执行任何内容**。
 */
const WINDOW_MS = 10 * 60 * 1000;
const FWD_TIMEOUT_MS = 8000; // 同步等待转发的上限；超时交给 ctx.waitUntil 后台完成
const HITS = new Map(); // ip -> [ts, ...]（实例内尽力而为；跨实例需 KV，暂不做）

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(o, status = 200) {
  return new Response(JSON.stringify(o), {
    status,
    headers: { 'content-type': 'application/json; charset=UTF-8', ...CORS },
  });
}

function clientIp(request, ctx) {
  // 优先平台提供的可信客户端 IP（EdgeOne：ctx.eo.clientIp / request.eo.clientIp），再退回 x-forwarded-for
  const eo = (ctx && ctx.eo) || (request && request.eo) || {};
  if (eo.clientIp) return String(eo.clientIp);
  const x = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  return x || 'unknown';
}

function rateOk(ip, max) {
  const now = Date.now();
  const arr = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= max) { HITS.set(ip, arr); return false; }
  arr.push(now);
  if (HITS.size > 5000) HITS.clear(); // 防内存膨胀
  HITS.set(ip, arr);
  return true;
}

/** 白名单式提取纯文本（只认这几种形态，其余一律忽略） */
function pickText(payload) {
  if (typeof payload === 'string') return payload;
  if (!payload || typeof payload !== 'object') return '';
  if (typeof payload.text === 'string') return payload.text;
  if (typeof payload.content === 'string') return payload.content;
  if (payload.text && typeof payload.text.content === 'string') return payload.text.content; // 钉钉
  if (payload.content && typeof payload.content.text === 'string') return payload.content.text; // 飞书
  if (typeof payload.message === 'string') return payload.message;
  return '';
}

/** 去控制字符 */
function clean(t) {
  return String(t).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim();
}

/** 钉钉机器人基址（地址写代码、密钥放 env —— 惯例） */
const DINGTALK_BASE = 'https://oapi.dingtalk.com/robot/send?access_token=';

/**
 * 多载体解析 webhook（按优先级），并返回命中的载体与键名（便于诊断）：
 *   ctx.env（EdgeOne Pages 实测载体）→ ctx.context.env → request.eo.env → process.env
 * 键优先级：FEEDBACK_WEBHOOK（完整 URL）→ DINGTALK_TOKEN（仅 token，代码拼地址）→ FEISHU_WEBHOOK
 */
function resolveWebhook(ctx, request) {
  const cands = [
    ['ctx.env', ctx && ctx.env],
    ['ctx.context.env', ctx && ctx.context && ctx.context.env],
    ['request.eo.env', request && request.eo && request.eo.env],
    ['process.env', (typeof process !== 'undefined' && process.env) || null],
  ];
  for (const [source, c] of cands) {
    if (!c) continue;
    if (c.FEEDBACK_WEBHOOK) return { url: String(c.FEEDBACK_WEBHOOK), source, key: 'FEEDBACK_WEBHOOK', env: c };
    if (c.DINGTALK_TOKEN) return { url: DINGTALK_BASE + String(c.DINGTALK_TOKEN), source, key: 'DINGTALK_TOKEN', env: c };
    if (c.FEISHU_WEBHOOK) return { url: String(c.FEISHU_WEBHOOK), source, key: 'FEISHU_WEBHOOK', env: c };
  }
  return { url: '', source: 'none', key: '', env: (ctx && ctx.env) || {} };
}

export async function onRequest(ctx) {
  // 兼容两种调用形态：onRequest({ request }) 与 onRequest(request)
  const request = (ctx && ctx.request) || ctx;
  const env0 = (typeof process !== 'undefined' && process.env) || {};

  // 诊断口：GET /api/feedback?diag=1
  // 只回「有没有 / 多长 / 键名筛选」——**不含任何取值**，可安全公开（用于确认部署是否注入环境变量）
  if (request.method === 'GET') {
    let diag = null;
    try { diag = new URL(request.url).searchParams.get('diag'); } catch (e) { diag = null; }
    if (diag === '1') {
      const hit = (o) => Object.keys(o || {}).filter((k) => /FEEDBACK|WEBHOOK|DING|TALK|FEISHU|ENV|VAR|SECRET|TOKEN/i.test(k));
      const keys = Object.keys(env0);
      const resolved = resolveWebhook(ctx, request);
      const hook = resolved.url || '';
      const carrier0 = (ctx && ctx.env) || {};
      // 多载体探测：变量可能不在 process.env，而在平台扩展 / handler 参数 / globalThis 上
      const carriers = {
        'process.env': { keyCount: keys.length, hit: hit(env0) },
      };
      try {
        const ctxKeys = Object.keys(ctx || {});
        carriers['handler-arg'] = { keyCount: ctxKeys.length, keys: ctxKeys.slice(0, 12) };
        const argEnv = (ctx && (ctx.env || (ctx.context && ctx.context.env))) || null;
        carriers['handler-arg.env'] = argEnv ? { keyCount: Object.keys(argEnv).length, hit: hit(argEnv) } : null;
      } catch (e) { carriers['handler-arg'] = 'err:' + String(e).slice(0, 60); }
      try {
        const eo = (request && request.eo) || null;
        carriers['request.eo'] = eo ? { keyCount: Object.keys(eo).length, keys: Object.keys(eo).slice(0, 12) } : null;
        carriers['request.eo.env'] = eo && eo.env ? { keyCount: Object.keys(eo.env).length, hit: hit(eo.env) } : null;
      } catch (e) { carriers['request.eo'] = 'err:' + String(e).slice(0, 60); }
      try {
        const g = typeof globalThis !== 'undefined' ? globalThis : {};
        carriers['globalThis.env'] = g.env ? { keyCount: Object.keys(g.env).length, hit: hit(g.env) } : null;
        carriers['globalThis 相关键'] = Object.keys(g).filter((k) => /env|edge|eo|kv|config|secret/i.test(k)).slice(0, 12);
      } catch (e) { carriers['globalThis'] = 'err:' + String(e).slice(0, 60); }
      return json({
        ok: true,
        diag: true,
        runtime: { hasEnv: keys.length > 0, envKeyCount: keys.length },
        envKeysHit: hit(env0),
        carriers,
        webhook: {
          present: !!hook,
          source: resolved.source,
          key: resolved.key,
          length: hook.length,
          looksDingtalk: /oapi\.dingtalk\.com/i.test(hook),
          looksFeishu: /feishu|larksuite/i.test(hook),
        },
        carrierKeys: Object.keys(carrier0).length,
        hint: hook
          ? 'webhook 已从 ' + resolved.source + ' 读到（键 ' + resolved.key + '）：POST 应可转发'
          : '各载体都没读到 webhook。请确认控制台已配置该变量，且本次部署发生在配置之后。',
      });
    }
    return json({ ok: false, error: 'POST only（诊断用：GET ?diag=1）' }, 405);
  }
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (request.method !== 'POST') return json({ ok: false, error: 'POST only' }, 405);

  const resolved = resolveWebhook(ctx, request);
  const env = resolved.env || {};
  const sizeMax = parseInt(env.FEEDBACK_SIZE_MAX || '16384', 10);
  const rateMax = parseInt(env.FEEDBACK_RATE_MAX || '5', 10);
  const webhook = resolved.url || '';

  const ip = clientIp(request, ctx);
  if (!rateOk(ip, rateMax)) return json({ ok: false, error: 'rate limited' }, 429);

  let raw = '';
  try { raw = await request.text(); } catch (e) { raw = ''; }
  if (raw.length > sizeMax) return json({ ok: false, error: 'too large' }, 413);

  let text = raw;
  try { text = pickText(JSON.parse(raw)); } catch (e) { /* 非 JSON：按纯文本处理 */ }
  text = clean(text).slice(0, 12000);
  if (!text) return json({ ok: false, error: 'empty' }, 400);
  // 关键词门槛（零成本反垃圾）：载荷须自报为反馈；与钉钉群机器人「自定义关键词」策略对齐
  if (!/反馈|feedback/i.test(text)) return json({ ok: false, error: 'not_feedback', hint: '请在正文中包含「反馈」或 feedback' }, 400);

  let forwarded = false;
  let ferr = '';
  let pending = false;
  if (webhook) {
    const body = /feishu|larksuite/i.test(webhook)
      ? { msg_type: 'text', content: { text } }
      : { msgtype: 'text', text: { content: text } };
    const task = (async () => {
      try {
        const r = await fetch(webhook, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(body),
        });
        forwarded = r.ok;
        if (!r.ok) ferr = 'forward_http_' + r.status;
      } catch (e) {
        ferr = String(e).slice(0, 120);
      }
    })();
    const raced = await Promise.race([
      task.then(() => 'done'),
      new Promise((r) => setTimeout(() => r('timeout'), FWD_TIMEOUT_MS)),
    ]);
    if (raced === 'timeout') {
      pending = true;
      if (ctx && typeof ctx.waitUntil === 'function') {
        try { ctx.waitUntil(task); } catch (e) { try { await task; pending = false; } catch (e2) { /* ignore */ } }
      } else {
        try { await task; pending = false; } catch (e) { /* ignore */ } // 无 waitUntil：继续等完，保证不丢
      }
      if (!forwarded) ferr = ferr || 'forward_timeout';
    }
  }
  // 始终记录一条（控制台日志可见）
  console.log('[feedback]', JSON.stringify({ ip: ip.slice(0, 12), bytes: raw.length, forwarded, pending, ferr, src: resolved.source + ':' + resolved.key }));
  return json({
    ok: true,
    forwarded,
    note: webhook
      ? (pending && !forwarded ? 'forwarded(pending)' : (forwarded ? 'forwarded' : 'forward_failed:' + ferr))
      : 'stored(log-only)',
  });
}
