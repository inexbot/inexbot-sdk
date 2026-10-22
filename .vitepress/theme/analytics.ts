// 访问统计事件层（umami v3 自托管）
//
// pageview 由 umami tracker 自动采集（见 config.mts 的 head 注入；tracker 已 hook
// history.pushState/replaceState，VitePress 的 SPA 路由切换会自动上报）。
// 本文件只补 4 个业务事件，这是文档站真正有价值的信号：
//   search       站内搜索词（客户"找不到什么"的直接证据）
//   notfound     404 命中路径（旧链接 / 文档缺口的证据）
//   download     取库环节：devkit 仓库 / CNB 直链 / 网盘 / 安装包
//   copy_prompt  首页「让 AI 助手自装技能包」提示词的复制次数（= 入口采纳率）
//
// 纪律（与项目既定口径一致）：
//   1) 字段全部枚举或区间，唯一的自由文本是搜索词 q —— 含 @ 或 8 位以上连续数字直接丢弃；
//   2) 不落 IP、不设 Cookie、不跨站；DNT 遵从，一律不发；
//   3) 失败静默：不重试上报、不打印错误、不阻塞渲染、不影响页面功能；
//   4) 只在生产域（UMAMI_SITE_HOST）上报；本地 dev/preview 只打 console.debug，
//      需要本地真发一次时在控制台执行 localStorage.setItem('umami-force','1')。
//   5) 全文件必须 SSR 安全：VitePress 构建会在 Node 里渲染组件，任何 location/document
//      访问前都要过 IS_BROWSER（首版曾在 SSR 抛 ReferenceError: location is not defined）。

import { defineComponent, h, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
// @ts-ignore -- 纯 JS 配置，无类型声明
import { UMAMI_ENABLED, UMAMI_SITE_HOST } from '../umami.mjs'

type EvName = 'search' | 'notfound' | 'download' | 'copy_prompt'

const ALLOWED: EvName[] = ['search', 'notfound', 'download', 'copy_prompt']
const IS_BROWSER = typeof window !== 'undefined' && typeof document !== 'undefined'
const sent = new Set<string>()
let installed = false

// ── 上报（带就绪队列；tracker 未加载完时短暂等待，超时静默丢弃） ──
let queue: Array<{ name: EvName; data: Record<string, string> }> = []
let flushing = false

function isProdHost(): boolean {
  if (!IS_BROWSER) return false
  try {
    if (location.hostname === UMAMI_SITE_HOST) return true
    return localStorage.getItem('umami-force') === '1'
  } catch {
    return false
  }
}

function dnt(): boolean {
  if (!IS_BROWSER) return true
  const n: any = navigator
  return n.doNotTrack === '1' || n.msDoNotTrack === '1' || (window as any).doNotTrack === '1'
}

function flush(attempt = 0) {
  if (!queue.length) return
  const um = (window as any).umami
  if (um && typeof um.track === 'function') {
    const pending = queue
    queue = []
    for (const it of pending) {
      try {
        um.track(it.name, it.data)
      } catch {
        /* 静默 */
      }
    }
    return
  }
  if (attempt >= 5) {
    queue = []
    flushing = false
    return
  }
  setTimeout(() => flush(attempt + 1), 600)
}

function fire(name: EvName, data: Record<string, string>) {
  if (!IS_BROWSER) return
  if (!UMAMI_ENABLED || !ALLOWED.includes(name) || dnt()) return
  if (!isProdHost()) {
    try {
      console.debug('[umami:skip]', name, data)
    } catch {
      /* 静默 */
    }
    return
  }
  const um = (window as any).umami
  if (um && typeof um.track === 'function') {
    try {
      um.track(name, data)
    } catch {
      /* 静默 */
    }
    return
  }
  queue.push({ name, data })
  if (!flushing) {
    flushing = true
    setTimeout(() => flush(0), 600)
  }
}

// ── 公共判定 ──
function refClass(): string {
  if (!IS_BROWSER) return 'direct'
  try {
    const r = document.referrer
    if (!r) return 'direct'
    const u = new URL(r)
    if (u.hostname === location.hostname) return 'internal'
    if (/baidu|google|bing|sogou|so\.com|duckduckgo|yandex|naver|daum|sm\.cn|toutiao/i.test(u.hostname))
      return 'search'
    return 'external'
  } catch {
    return 'direct'
  }
}

function langPath(): string {
  if (!IS_BROWSER) return '/'
  const seg = location.pathname.split('/')[1] || ''
  return ['zh', 'en', 'kr'].includes(seg) ? '/' + seg : '/'
}

function searchable(q: string): boolean {
  if (q.length < 2 || q.length > 50) return false
  if (q.includes('@')) return false
  if (/\d{8,}/.test(q)) return false
  return true
}

// 返回 null 表示「还没定」：搜索索引在首次使用时才加载，结果渲染是异步的。
// 注意：绝不能把「加载中 / 尚未渲染」当成 0 条结果 —— hits=0 是「客户搜了但文档没有」这个
// 最有价值的信号，误报会让整张表反向误导（首版本地验证就踩到：搜「点动」报 0）。
function readHits(): string | null {
  if (!IS_BROWSER) return null
  const box = document.querySelector('.VPLocalSearchBox')
  if (!box) return null
  // ⚠ 踩坑：VitePress 的 .search-loading 元素「常驻 DOM」，只在搜索进行中加 .active
  // ⇒ 不能只判断元素是否存在（首版这么写，导致 hits 100% unknown）。
  const loading = box.querySelector('.search-loading')
  if (loading && loading.classList.contains('active')) return null
  if (box.querySelector('.no-results')) return '0'
  const list = box.querySelector('.results')
  if (!list) return null
  const n = list.querySelectorAll('.result').length
  if (n === 0) return null
  return n <= 5 ? '1-5' : '6+'
}

// ── 外链分类（download） ──
const LINK_RULES: Array<[RegExp, string]> = [
  [/cnb\.cool\/inexbot\/inexbot-sdk-devkit\/-\/git\/raw\//i, 'cnb-raw'],
  [/cnb\.cool\/inexbot\/inexbot-sdk-devkit/i, 'devkit-repo'],
  [/github\.com\/inexbot\//i, 'github'],
  [/pan\.baidu\.com/i, 'netdisk'],
  [/\/ai-prompt\.txt/i, 'ai-prompt'],
  [/\.(zip|7z|rar|tar\.gz|gz)(\?|$)/i, 'package']
]

function installGlobalHandlers() {
  if (installed || !IS_BROWSER) return
  installed = true

  // ① search：站内搜索输入（VitePress local search 是即时过滤，不是"提交"）
  let searchTimer: any = null
  document.addEventListener(
    'input',
    (e: any) => {
      const el = e.target as HTMLInputElement | null
      if (!el || el.tagName !== 'INPUT') return
      if (!el.classList || !el.classList.contains('search-input')) return
      if (!el.closest('.VPLocalSearchBox')) return
      const value = el.value || ''
      clearTimeout(searchTimer)
      searchTimer = setTimeout(() => {
        const q = value.trim()
        if (!searchable(q)) return
        const key = 'search::' + q
        if (sent.has(key)) return
        // 结果渲染是异步的（首次搜索还要加载索引），轮询等它定下来再上报，最多 3s
        let tries = 0
        const settle = () => {
          const hits = readHits()
          if (hits === null && tries < 24) {
            tries++
            setTimeout(settle, 200)
            return
          }
          if (sent.has(key)) return
          sent.add(key)
          fire('search', { q, hits: hits ?? 'unknown', page: langPath() })
        }
        setTimeout(settle, 250)
      }, 900)
    },
    true
  )

  // ② download / ③ copy_prompt：统一的捕获阶段 click
  document.addEventListener(
    'click',
    (e: any) => {
      const t = e.target as HTMLElement | null
      if (!t || typeof t.closest !== 'function') return

      // copy_prompt：首页提示词代码块的复制按钮（VitePress: div[class*=language-] > button.copy）
      const btn = t.closest('div[class*="language-"] > button.copy') as HTMLElement | null
      if (btn) {
        const code = btn.parentElement?.querySelector('pre code')?.textContent || ''
        if (/SKILL|技能包/i.test(code)) {
          const m = /v(\d+\.\d+\.\d+)/.exec(code)
          const key = 'copy_prompt::' + (m ? m[1] : 'unknown')
          if (!sent.has(key)) {
            sent.add(key)
            fire('copy_prompt', { ver: m ? m[1] : 'unknown', page: langPath() })
          }
        }
        return
      }

      // download：跨域链接按白名单分类，站内导航不上报
      const a = t.closest('a[href]') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') || ''
      if (!/^https?:\/\//i.test(href)) return
      try {
        if (new URL(href).hostname === location.hostname) return
      } catch {
        return
      }
      for (const [re, target] of LINK_RULES) {
        if (re.test(href)) {
          fire('download', { target, page: langPath() })
          return
        }
      }
    },
    true
  )
}

export default defineComponent({
  name: 'AnalyticsTracker',
  setup() {
    const { page } = useData()
    const route = useRoute()

    installGlobalHandlers()

    // ④ notfound：route.data.isNotFound（VitePress 2.x 的 notFoundPageData 标记）
    watch(
      [() => route.path, () => (page.value as any).isNotFound],
      ([p, nf]: any) => {
        if (!IS_BROWSER || !nf) return
        const path = String(p || '').split('?')[0].slice(0, 120)
        const key = 'notfound::' + path
        if (sent.has(key)) return
        sent.add(key)
        fire('notfound', { path, ref: refClass(), page: langPath() })
      },
      { immediate: true, flush: 'post' }
    )

    return () => null
  }
})
