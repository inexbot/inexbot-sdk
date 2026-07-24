import { DefaultTheme, defineConfig } from 'vitepress'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'

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
        ? (prefix ? `${prefix}/${entry}` : `/${entry}`)
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
        sidebar: krSidebar,
        search: {
          provider: 'local',
          options: searchOptions(false)
        }
      }
    }
  }
})
