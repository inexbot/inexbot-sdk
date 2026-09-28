#!/usr/bin/env node
/**
 * generate-llms.mjs — 构建后生成面向 AI Agent 的机器可读文件
 * ------------------------------------------------------------------
 * 产物（写入 dist/，随站点部署）：
 *   1. dist/llms.txt                策展索引（默认上位机 → 进阶通道）
 *   2. dist/llms-full.txt           全量中文文档合并（单页以分隔线隔开，附原文 URL）
 *   3. dist/<lang>/llms.txt         语言目录内同名副本
 *   4. dist/<lang>/llms-full.txt    同上
 *   5. dist/<lang>/<页面路径>.md    每页纯 Markdown 版本（与 .html 同路径）
 *
 * 调用方式：
 *   - npm run docs:build 末尾自动执行（见 package.json）
 *   - 单独执行：node scripts/generate-llms.mjs
 *
 * 说明：
 *   - 当前先中文单语言（LANGS 数组，后续可扩 en/kr；届时根目录文件将改为语言路由页）。
 *   - 输出不含任何时间戳，保证可重复构建、便于 diff 与缓存。
 *   - 链接使用绝对 URL（llmstxt.org 约定），文件名按 URL 编码（括号等特殊字符转义）。
 * ------------------------------------------------------------------
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'docs')
const OUT = path.join(ROOT, 'dist')
const HOST = 'https://open.inexbot.com'
const LANGS = ['zh']
const SKIP_DIRS = new Set(['assets', 'assets_T31'])

const SITE_TITLE = '纳博特 NexDroid 开放平台（二次开发文档）'
const SITE_SUMMARY =
  '工业机器人控制器二次开发文档。默认开发方式：上位机 SDK（C++/C#/Python）；' +
  'JSON 协议、控制器/示教器、ROS、主站库、HAL 为进阶通道，仅在上位机无法满足或客户明确要求时使用。'

// 快速入口（人工策展；条目缺失时告警并跳过）
const QUICK_ENTRIES = [
  '02.入门指南.md',
  '04.上位机/01.C++/03.示例/01.快速开始.md',
  '13.Agent 开发指引.md',
  '14.编译与验证指南.md',
  '11.常见问题.md',
  '12.相关下载.md',
  '版本与兼容性.md',
]

// 上位机（默认开发方式）分组
const HOST_SECTIONS = [
  ['04.上位机/01.C++', 'C++'],
  ['04.上位机/02.CSharp', 'C#'],
  ['04.上位机/03.Python', 'Python'],
]

// 进阶通道分组（仅在上位机无法满足或客户主动提出时引导）
const ADV_SECTIONS = [
  ['05.JSON-协议', 'JSON 协议（RTL-22.07 / RTL-24.03 / RTL-25.01）'],
  ['06.控制器', '控制器二次开发'],
  ['07.示教器', '示教器二次开发'],
  ['08.ROS', 'ROS 集成'],
  ['09.主站库', 'EtherCAT 主站库'],
  ['10.HAL', 'HAL 硬件抽象层'],
]

const OTHER_ENTRIES = ['01.概述.md', '03.Demo示例.md']

// ---------- 工具函数 ----------

async function walkMd(dir, rel, out) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
  for (const e of entries) {
    const childRel = rel ? `${rel}/${e.name}` : e.name
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      await walkMd(path.join(dir, e.name), childRel, out)
    } else if (e.name.endsWith('.md')) {
      out.push(childRel)
    }
  }
  return out
}

function h1Of(text, fallback) {
  const m = text.match(/^#\s+(.+?)\s*$/m)
  return m ? m[1] : fallback
}

function bodyOf(text) {
  return text
    .replace(/^#\s+.+?$/m, '')
    .split('\n')
    .filter((l) => !/^\s*!\[.*\]\(.*\)\s*$/.test(l))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function encodeUrlPath(p) {
  return encodeURI(p).replace(/\(/g, '%28').replace(/\)/g, '%29')
}

function pageUrl(lang, rel) {
  if (rel === 'index.md' || rel.endsWith('/index.md')) {
    return encodeUrlPath(`${HOST}/${lang}/${rel.replace(/index\.md$/, '')}`)
  }
  return encodeUrlPath(`${HOST}/${lang}/${rel.replace(/\.md$/, '.html')}`)
}

async function loadPages(lang) {
  const base = path.join(SRC, lang)
  const rels = await walkMd(base, '', [])
  const pages = []
  for (const rel of rels) {
    const raw = await fs.readFile(path.join(base, ...rel.split('/')), 'utf8')
    pages.push({ rel, raw, title: h1Of(raw, rel.replace(/\.md$/, '')), url: pageUrl(lang, rel) })
  }
  return pages
}

// ---------- llms.txt（索引） ----------

function buildIndex(lang, pages) {
  const byRel = new Map(pages.map((p) => [p.rel, p]))

  const one = (rel) => {
    const p = byRel.get(rel)
    if (!p) {
      console.warn(`[llms] 索引条目不存在，已跳过：${rel}`)
      return null
    }
    return `- [${p.title}](${p.url})`
  }

  const listSection = (title, rels) => {
    const lines = rels.map(one).filter(Boolean)
    return lines.length ? `## ${title}\n\n${lines.join('\n')}\n\n` : ''
  }

  const dirSection = (title, prefix) => {
    const headRel = `${prefix}/index.md`
    const items = pages.filter((p) => p.rel.startsWith(`${prefix}/`) && !p.rel.endsWith('index.md'))
    const lines = []
    const head = byRel.has(headRel) ? one(headRel) : null
    if (head) lines.push(head)
    for (const p of items) lines.push(`- [${p.title}](${p.url})`)
    return lines.length ? `### ${title}\n\n${lines.join('\n')}\n\n` : ''
  }

  let out = `# ${SITE_TITLE}\n\n`
  out += `> ${SITE_SUMMARY}\n>\n> 机器可读说明：本文件为文档索引；每页均提供纯 Markdown 版本（将链接中的 .html 替换为 .md 即为原文）。全量内容见 ${HOST}/llms-full.txt，站点地图见 ${HOST}/sitemap.xml。\n\n`

  out += listSection('快速入口', QUICK_ENTRIES)

  let host = ''
  for (const [prefix, label] of HOST_SECTIONS) host += dirSection(label, prefix)
  if (host) out += `## 上位机 SDK（默认开发方式）\n\n${host}`

  let adv = ''
  for (const [prefix, label] of ADV_SECTIONS) adv += dirSection(label, prefix)
  if (adv) out += `## 进阶通道（仅在上位机无法满足或客户主动提出时引导）\n\n${adv}`

  out += listSection('概述与参考', OTHER_ENTRIES)
  return out
}

// ---------- llms-full.txt（全量合并） ----------

function buildFull(pages) {
  const head = [
    `# ${SITE_TITLE} — 全量文档（中文）`,
    '',
    '> 本文件由构建脚本（scripts/generate-llms.mjs）自动生成，随站点更新；每页正文之间以分隔线隔开，标题下方给出原文 URL。',
    `> 单页 Markdown 版本：将 .html 替换为 .md（例如 ${HOST}/zh/01.概述.html → 01.概述.md）。`,
    `> 文档索引：${HOST}/llms.txt ｜ 站点入口：${HOST}/zh/`,
    '',
  ].join('\n')

  const parts = pages
    .filter((p) => !p.rel.endsWith('index.md'))
    .map((p) => `---\n\n# ${p.title}\n\n> 原文：${p.url}\n\n${bodyOf(p.raw)}`)

  return `${head}\n${parts.join('\n\n')}\n`
}

// ---------- 输出 ----------

async function writeAll(lang, pages) {
  const index = buildIndex(lang, pages)
  const full = buildFull(pages)

  await fs.mkdir(path.join(OUT, lang), { recursive: true })
  await fs.writeFile(path.join(OUT, 'llms.txt'), index, 'utf8')
  await fs.writeFile(path.join(OUT, 'llms-full.txt'), full, 'utf8')
  await fs.writeFile(path.join(OUT, lang, 'llms.txt'), index, 'utf8')
  await fs.writeFile(path.join(OUT, lang, 'llms-full.txt'), full, 'utf8')

  let copied = 0
  for (const p of pages) {
    const dest = path.join(OUT, lang, ...p.rel.split('/'))
    await fs.mkdir(path.dirname(dest), { recursive: true })
    await fs.writeFile(dest, p.raw, 'utf8')
    copied++
  }

  return { pages: pages.length, copied, indexBytes: Buffer.byteLength(index), fullBytes: Buffer.byteLength(full) }
}

async function main() {
  for (const lang of LANGS) {
    const pages = await loadPages(lang)
    if (pages.length === 0) throw new Error(`docs/${lang} 下未找到 Markdown 文件`)
    const s = await writeAll(lang, pages)
    console.log(
      `[llms] ${lang}: 页面 ${s.pages} ｜ .md 副本 ${s.copied} ｜ llms.txt ${(s.indexBytes / 1024).toFixed(1)} KB ｜ llms-full.txt ${(s.fullBytes / 1024).toFixed(0)} KB`,
    )
  }
  console.log('[llms] 完成 → dist/llms.txt、dist/llms-full.txt、dist/<lang>/llms*.txt、dist/<lang>/**/*.md')
}

main().catch((err) => {
  console.error('[llms] 生成失败：', err)
  process.exit(1)
})
