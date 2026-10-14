/**
 * EdgeOne Pages Function —— POST /api/feedback
 * ============================================================
 * 「无秘密端点」：本文件与最终 URL 都是公开的，**不含任何凭据**。
 *   限流（每 IP 每 10 分钟上限，**实例内尽力而为**）+ 体积上限 + 载荷白名单提取纯文本
 *   + 关键词门槛（正文须含「反馈」/feedback，零成本反垃圾；与钉钉关键词策略对齐）
 *   → 转发到服务端环境变量配置的群机器人 webhook（钉钉/飞书）
 *   → 无论是否配置 webhook，都会写一条日志（可在 EdgeOne 控制台实时日志查看）
 *
 * 环境变量（在 EdgeOne Pages 控制台 → 项目设置 → 环境变量 里配，**绝不进客户端**）：
 *   FEEDBACK_WEBHOOK     群机器人 webhook（钉钉或飞书；缺省＝只记日志）
 *   FEEDBACK_RATE_MAX    可选：每 IP / 10 分钟上限，默认 5
 *   FEEDBACK_SIZE_MAX    可选：请求体字节上限，默认 16384
 *
 * 约定：
 *   - POST 请求体可为 JSON（{"msgtype":"text","text":{"content":"…"}} /
 *     {"msg_type":"text","content":{"text":"…"}} / {"text":"…"} / {"message":"…"}）或纯文本。
 *   - 只接收、只存档/转发；**不自动建 Issue、不自动广播给任何人、不执行任何内容**。
 */
const WINDOW_MS = 10 * 60 * 1000;
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

function clientIp(request) {
  const x = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  return x || (request.eo && request.eo.clientIp) || 'unknown';
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
      const hook = env0.FEEDBACK_WEBHOOK || '';
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
          length: hook.length,
          looksDingtalk: /oapi\.dingtalk\.com/i.test(hook),
          looksFeishu: /feishu|larksuite/i.test(hook),
        },
        hint: hook
          ? 'webhook 已在 process.env 读到：POST 应可转发'
          : 'process.env 里没有 FEEDBACK_WEBHOOK；请看 carriers 各载体的 keyCount/hit，判断变量是否注到了别处（如 request.eo / handler 参数 / globalThis.env）。',
      });
    }
    return json({ ok: false, error: 'POST only（诊断用：GET ?diag=1）' }, 405);
  }
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (request.method !== 'POST') return json({ ok: false, error: 'POST only' }, 405);

  const env = (typeof process !== 'undefined' && process.env) || {};
  const sizeMax = parseInt(env.FEEDBACK_SIZE_MAX || '16384', 10);
  const rateMax = parseInt(env.FEEDBACK_RATE_MAX || '5', 10);
  const webhook = env.FEEDBACK_WEBHOOK || '';

  const ip = clientIp(request);
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
  if (webhook) {
    try {
      const body = /feishu|larksuite/i.test(webhook)
        ? { msg_type: 'text', content: { text } }
        : { msgtype: 'text', text: { content: text } };
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
  }
  // 始终记录一条（控制台日志可见）
  console.log('[feedback]', JSON.stringify({ ip: ip.slice(0, 12), bytes: raw.length, forwarded, ferr }));
  return json({
    ok: true,
    forwarded,
    note: webhook ? (forwarded ? 'forwarded' : 'forward_failed:' + ferr) : 'stored(log-only)',
  });
}
