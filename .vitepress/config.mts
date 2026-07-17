import { DefaultTheme, defineConfig } from 'vitepress'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'

// 递归扫描目录生成侧边栏
async function buildSidebar(dir: string, prefix = '', skipDirs: string[] = []): Promise<DefaultTheme.SidebarItem[]> {
  const items: DefaultTheme.SidebarItem[] = []
  const entries = await readdir(dir)

  for (const entry of entries.sort()) {
    // 跳过 assets 等特殊目录和文件
    if (entry === 'assets' || entry === 'assets_T31' ||
        entry === 'convert_ascii_tables.py' || entry === 'README.md' ||
        skipDirs.includes(entry)) continue

    const fullPath = join(dir, entry)
    const st = await stat(fullPath)

    if (st.isDirectory()) {
      // 检查目录下是否有 index.md
      const indexPath = join(fullPath, 'index.md')
      let hasIndex = false
      try {
        const indexStat = await stat(indexPath)
        hasIndex = indexStat.isFile()
      } catch {}

      // 目录本身有 index.md，则该目录入口链接指向 index
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

// 获取 docs 目录路径
const docsDir = join(process.cwd(), 'docs')

// 中文侧边栏（排除 en 子目录）
const zhSidebar = await buildSidebar(docsDir, '', ['en'])
// 英文侧边栏（需要 /en 前缀）
const enSidebar = await buildSidebar(join(docsDir, 'en'), '/en')

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
  head: [
    [
      'script',
      {},
      `(function(){
        var KEY='vp-lang';
        var saved=localStorage.getItem(KEY);
        var path=location.pathname;
        var isEn=path.indexOf('/en/')===0||path==='/en';
        // 有手动选择：跳到对应语言
        if(saved==='en'&&!isEn){
          location.replace('/en/');
          return;
        }
        if(saved==='zh'&&isEn){
          location.replace('/');
          return;
        }
        // 首次访问根路径，检测浏览器语言
        if(!saved&&!isEn&&(path==='/'||path==='')){
          var lang=(navigator.languages&&navigator.languages[0]||navigator.language||'').toLowerCase();
          if(!/^zh/.test(lang)){
            localStorage.setItem(KEY,'en');
            location.replace('/en/');
          }else{
            localStorage.setItem(KEY,'zh');
          }
        }
      })();`
    ]
  ],
  transformPageData(pageData) {
    // 在页面数据中注入语言标记，供前端使用
    const isEn = pageData.relativePath.startsWith('en/')
    pageData.lang = isEn ? 'en' : 'zh'
  },
  sitemap: {
    hostname: 'https://open.inexbot.com'
  },
  themeConfig: {
    i18nRouting: false
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      title: '纳博特科技开放平台',
      description: '纳博特科技官方SDK文档',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '入门指南', link: '/02.入门指南' },
          {
            text: '开发文档',
            items: [
              { text: '控制器', link: '/04.控制器/' },
              { text: '示教器', link: '/05.示教器/' },
              { text: '上位机', link: '/06.上位机/' },
              { text: 'JSON协议', link: '/07.JSON 协议/' },
              { text: 'ROS', link: '/08.ROS/' },
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
              { text: 'Controller', link: '/en/04.Controller/' },
              { text: 'Teach Pendant', link: '/en/05.Teach-Pendant/' },
              { text: 'Host Computer', link: '/en/06.Host-Computer/' },
              { text: 'JSON Protocol', link: '/en/07.JSON-Protocol/' },
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
    }
  }
})
