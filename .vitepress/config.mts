import { DefaultTheme, defineConfig } from 'vitepress'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'

// ── AI 助手入口提示：渲染时注入每篇文章末尾（位于 <main> 正文域内），不写入源文件 ──
const AI_HINT_URL_13 = '/zh/13.Agent%20%E5%BC%80%E5%8F%91%E6%8C%87%E5%BC%95.html'
const AI_HINT_URL_15 = '/zh/15.%E7%94%9F%E6%88%90%E5%89%8D%E4%BF%A1%E6%81%AF%E9%87%87%E9%9B%86%E6%B8%85%E5%8D%95.html'
const AI_HINT_ZH =
  '<div class="ai-entry-hint">🤖 AI 助手 / 自动化工具：先读 ' +
  `<a href="${AI_HINT_URL_13}">《Agent 开发指引》</a> 与 ` +
  `<a href="${AI_HINT_URL_15}">《生成前信息采集清单》</a>；机器可读入口 ` +
  '<a href="/llms.txt">/llms.txt</a>；本页纯文本版：把网址中的 .html 换成 .md</div>'
const AI_HINT_EN =
  '<div class="ai-entry-hint">🤖 AI assistants / automation: start with the ' +
  `<a href="${AI_HINT_URL_13}">Agent Development Guide</a> and ` +
  `<a href="${AI_HINT_URL_15}">Pre-generation Checklist</a> (Chinese); machine-readable entry: ` +
  '<a href="/llms.txt">/llms.txt</a>; plain-text version: swap .html for .md in the URL</div>'
const AI_HINT_SKIP = new Set(['index.md', 'zh/index.md', 'en/index.md', 'kr/index.md'])

function aiEntryHint(md: any) {
  md.core.ruler.push('ai-entry-hint', (state: any) => {
    // 只在整篇文档解析时注入：parseInline（::: 容器标题、行内渲染等）同样会触发 core 规则链，
    // 不过滤会导致每个容器处重复注入（曾致单页出现 7 份提示）
    if (state.inlineMode) return true
    const rel: string = state?.env?.relativePath ?? ''
    if (AI_HINT_SKIP.has(rel)) return true
    // 幂等保护：本篇渲染中已注入过则跳过
    if (
      state.tokens.some(
        (t: any) => t.type === 'html_block' && t.content.includes('ai-entry-hint')
      )
    ) {
      return true
    }
    const token = new state.Token('html_block', '', 0)
    token.block = true
    token.content =
      (rel.startsWith('en/') || rel.startsWith('kr/') ? AI_HINT_EN : AI_HINT_ZH) + '\n'
    state.tokens.push(token)
    return true
  })
}

// 递归扫描目录生成侧边栏
async function buildSidebar(dir: string, prefix = '', skipDirs: string[] = []): Promise<DefaultTheme.SidebarItem[]> {
  const items: DefaultTheme.SidebarItem[] = []
  const entries = await readdir(dir)

  for (const entry of entries.sort()) {
    if (entry === 'assets' || entry === 'assets_T31' ||
        entry === 'convert_ascii_tables.py' || entry === 'README.md' ||
        skipDirs.includes(entry)) continue

    const fullPath = join(dir, entry)
    const st = await stat(fullPath)

    if (st.isDirectory()) {
      const indexPath = join(fullPath, 'index.md')
      let hasIndex = false
      try {
        const indexStat = await stat(indexPath)
        hasIndex = indexStat.isFile()
      } catch {}

      const dirLink = hasIndex
        ? (prefix ? `${prefix}/${entry}/` : `/${entry}/`)
        : undefined

      const children = await buildSidebar(fullPath, prefix ? `${prefix}/${entry}` : `/${entry}`, skipDirs)
      if (children.length > 0) {
        items.push({
          text: entry,
          collapsed: true,
          link: dirLink,
          items: children
        })
      } else if (hasIndex) {
        items.push({ text: entry, link: dirLink })
      }
    } else if (extname(entry) === '.md') {
      const name = basename(entry, '.md')
      if (name === 'index') continue
      const link = prefix ? `${prefix}/${name}` : `/${name}`
      items.push({ text: name, link })
    }
  }
  return items
}

// 中文分词器
function chineseTokenizer(text: string): string[] {
  const enTokens: string[] = []
  const cnChars: string[] = []
  let currentCn = ''
  for (const ch of text) {
    if (/[\u4e00-\u9fff]/.test(ch)) {
      currentCn += ch
    } else {
      if (currentCn.length > 0) {
        cnChars.push(currentCn)
        if (currentCn.length >= 2) {
          cnChars.push(currentCn.slice(0, 2))
          cnChars.push(currentCn.slice(0, 1))
        }
        currentCn = ''
      }
      if (/[a-zA-Z0-9]/.test(ch)) {
        enTokens.push(ch)
      } else if (enTokens.length > 0) {
        enTokens.push(' ')
      }
    }
  }
  if (currentCn.length > 0) {
    cnChars.push(currentCn)
    if (currentCn.length >= 2) {
      cnChars.push(currentCn.slice(0, 2))
      cnChars.push(currentCn.slice(0, 1))
    }
  }
  return [...enTokens.filter(t => t !== ' '), ...cnChars].filter(t => t.length > 0)
}

const docsDir = join(process.cwd(), 'docs')

// 各语言侧边栏
const zhSidebar = await buildSidebar(join(docsDir, 'zh'), '/zh')
const enSidebar = await buildSidebar(join(docsDir, 'en'), '/en')
const krSidebar = await buildSidebar(join(docsDir, 'kr'), '/kr')

// 搜索配置
function searchOptions(useChineseTokenizer: boolean) {
  return {
    detailedView: true,
    maxResults: 60,
    minLength: 1,
    fields: ['title', 'titles', 'text'] as const,
    storeFields: ['title', 'titles'] as const,
    ...(useChineseTokenizer ? { tokenize: (text: string) => chineseTokenizer(text) } : {}),
    searchOptions: {
      fuzzy: 0.2,
      prefix: true,
      boost: { title: 4, text: 2, titles: 1 }
    }
  }
}

export default defineConfig({
  srcDir: "./docs",
  ignoreDeadLinks: true,
  markdown: {
    config: (md: any) => {
      md.use(aiEntryHint)
    }
  },
  outDir: "./dist",
  sitemap: {
    hostname: 'https://open.inexbot.com'
  },
  themeConfig: {
    i18nRouting: false,
    search: {
      provider: 'local',
      options: searchOptions(true)
    }
  },
  locales: {
    zh: {
      label: '中文',
      lang: 'zh-CN',
      title: '纳博特科技开放平台',
      description: '纳博特科技官方SDK文档',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '入门指南', link: '/zh/02.入门指南' },
          {
            text: '开发文档',
            items: [
              { text: '上位机', link: '/zh/04.上位机/' },
              { text: 'JSON协议', link: '/zh/05.JSON-协议/' },
              { text: '控制器', link: '/zh/06.控制器/' },
              { text: '示教器', link: '/zh/07.示教器/' },
              { text: 'ROS', link: '/zh/08.ROS/' },
            ]
          }
        ],
        socialLinks: [
          { icon: 'github', link: 'https://github.com/inexbot/inexbot-sdk' }
        ],
        sidebar: zhSidebar,
        search: {
          provider: 'local',
          options: searchOptions(true)
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'iNexBot Open Platform',
      description: 'iNexBot Official SDK Documentation',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Getting Started', link: '/en/02.Getting-Started' },
          {
            text: 'Documentation',
            items: [
              { text: 'Host Computer', link: '/en/04.Host-Computer/' },
              { text: 'JSON Protocol', link: '/en/05.JSON-Protocol/' },
              { text: 'Controller', link: '/en/06.Controller/' },
              { text: 'Teach Pendant', link: '/en/07.Teach-Pendant/' },
              { text: 'ROS', link: '/en/08.ROS/' },
            ]
          }
        ],
        socialLinks: [
          { icon: 'github', link: 'https://github.com/inexbot/inexbot-sdk' }
        ],
        sidebar: enSidebar,
        search: {
          provider: 'local',
          options: searchOptions(false)
        }
      }
    },
    kr: {
      label: '한국어',
      lang: 'ko-KR',
      title: 'iNexBot 오픈 플랫폼',
      description: 'iNexBot 공식 SDK 문서',
      themeConfig: {
        nav: [
          { text: '홈', link: '/kr/' },
          { text: '시작하기', link: '/kr/02.시작하기' },
          {
            text: '문서',
            items: [
              { text: '호스트 컴퓨터', link: '/kr/04.호스트-컴퓨터/' },
              { text: 'JSON 프로토콜', link: '/kr/05.JSON-프로토콜/' },
              { text: '컨트롤러', link: '/kr/06.컨트롤러/' },
              { text: '티치 펜던트', link: '/kr/07.티치-펜던트/' },
              { text: 'ROS', link: '/kr/08.ROS/' },
            ]
          }
        ],
        socialLinks: [
          { icon: 'github', link: 'https://github.com/inexbot/inexbot-sdk' }
        ],
        sidebar: krSidebar,
        search: {
          provider: 'local',
          options: searchOptions(false)
        }
      }
    }
  }
})
