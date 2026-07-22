#!/usr/bin/env node
/**
 * docs:check — 纳博特 SDK 文档质量检查脚本
 *
 * 检查项（序号 1-6 为基础检查，7-10 为规范检查）：
 *   1. 未闭合代码围栏
 *   2. 空页面 / 近空页面
 *   3. 重复的一级标题
 *   4. 站内链接
 *   5. 图片文件是否存在
 *   6. 代码块缺少语言标识（警告）
 *   --- 以下是中文术语与写作规范新增 ---
 *   7. 术语大小写规范（警告）
 *   8. 中英文间距规范（警告）
 *   9. 文件命名规范（警告）
 *  10. 警告/提示格式规范（警告）
 *
 * 用法: node scripts/check-docs.mjs
 * 退出码: 0=通过, 1=有错误, 2=仅有警告
 */

import { readFileSync, readdirSync } from 'fs';
import { join, extname, dirname, relative, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DOCS = join(ROOT, 'docs');
const SKIP_DIRS = new Set(['node_modules', '.vitepress', 'dist']);
const IMG_EXTS = new Set(['.png','.jpg','.jpeg','.gif','.svg','.webp','.bmp','.ico']);
const LANG_DIRS = new Set(['zh', 'en', 'kr']);

// ─── Helpers

function getAllMdFiles(dir) {
  const files = [];
  function walk(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(p); }
      else if (e.isFile() && extname(e.name) === '.md') files.push(p);
    }
  }
  walk(dir);
  return files.sort();
}

const read = p => readFileSync(p, 'utf-8');
const rel = p => relative(DOCS, p).replace(/\\/g, '/');

function readPlain(p) {
  return read(p).replace(/^---[\s\S]*?^---/m, '').trim();
}

function stripCode(content) {
  return content
    .replace(/```[\s\S]*?```/g, 'CODE_BLOCK_REMOVED')
    .replace(/`[^`\n]+`/g, '')
    .replace(/!?\[([^\]]*)\]\([^)]+\)/g, (_, text) => text);  // strip link targets, keep alt/text
}

/**
 * Strip code blocks from content but keep the rest (for link/image checks).
 * Returns array of [before, after] indices mapping.
 */
function stripCodeBlocks(content) {
  return content.replace(/```[\s\S]*?```/g, 'CODE_BLOCK_REMOVED');
}

// ─── 1. 未闭合代码围栏

function checkCodeFences(files) {
  const errors = [];
  for (const f of files) {
    const lines = read(f).split('\n');
    let fenceLine = 0, open = false;
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(/^(`{3,})(\S*)\r?$/);
      if (m && m[1].length === 3) {  // only match exactly 3 backticks
        open ? (open = false) : (open = true, fenceLine = i + 1);
      }
    }
    if (open) errors.push({ file: rel(f), line: fenceLine, msg: `未闭合代码围栏，始于第 ${fenceLine} 行` });
  }
  return errors;
}

// ─── 2. 空页面 / 近空页面

function checkEmptyPages(files) {
  const errors = [];
  for (const f of files) {
    const text = readPlain(f);
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length === 0) errors.push({ file: rel(f), msg: `空页面` });
    else if (lines.length <= 3) errors.push({ file: rel(f), msg: `近空页面（仅 ${lines.length} 行有效内容）` });
  }
  return errors;
}

// ─── 3. 重复一级标题

function checkDuplicateH1(files) {
  const errors = [];
  for (const f of files) {
    const h1s = read(f).match(/^#\s+(.+)$/gm);
    if (h1s && h1s.length > 1) {
      errors.push({ file: rel(f), msg: `重复H1 (${h1s.length}个): ${h1s.map(s => s.replace(/^#\s+/, '').slice(0, 30)).join(' | ')}` });
    }
  }
  return errors;
}

// ─── 4. 站内链接

function checkInternalLinks(files) {
  const valid = new Set();
  for (const f of files) {
    const rp = rel(f).replace(/\.md$/, '');
    valid.add(rp);
    if (rp.endsWith('/index')) valid.add(rp.replace('/index', ''));
  }

  const errors = [];
  for (const f of files) {
    const content = stripCodeBlocks(read(f));
    const linkRe = /\[([^\]]*)\]\(([^)]+)\)/g;
    let m;
    while ((m = linkRe.exec(content)) !== null) {
      const target = m[2].split('#')[0].split('?')[0];
      if (!target || /^(https?|mailto|#)/.test(target) || target.startsWith('./#')) continue;
      const ext = extname(target).toLowerCase();
      if (IMG_EXTS.has(ext)) continue;

      let resolved;
      if (target.startsWith('/')) {
        resolved = target.slice(1).replace(/\.md$/, '');
      } else {
        resolved = relative(DOCS, resolve(dirname(f), target)).replace(/\\/g, '').replace(/\.md$/, '');
      }
      // URL-decode percent-encoded characters (e.g., %28 → ()
      resolved = decodeURIComponent(resolved);
      resolved = resolved.replace(/\/$/, '');

      if (!valid.has(resolved) && !valid.has(resolved + '/index')) {
        errors.push({ file: rel(f), msg: `断链: "${target}" → "${resolved}" 不存在` });
      }
    }
  }
  return errors;
}

// ─── 5. 图片文件

function checkImages(files) {
  const actual = new Set();
  function walkDir(dir) {
    let entries;
    try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const p = join(dir, e.name);
      if (e.isDirectory() && !SKIP_DIRS.has(e.name)) walkDir(p);
      else if (e.isFile() && IMG_EXTS.has(extname(e.name).toLowerCase())) {
        actual.add(relative(DOCS, p).replace(/\\/g, '/'));
      }
    }
  }
  walkDir(DOCS);

  const errors = [];
  for (const f of files) {
    const content = stripCode(read(f));
    const imgRe = /!\[([^\]]*)\]\(([^)]+)\)|<img[^>]+src="([^"]+)"/g;
    let m;
    while ((m = imgRe.exec(content)) !== null) {
      const src = m[2] || m[3];
      if (!src || /^(https?|data:)/.test(src)) continue;
      const resolved = src.startsWith('/')
        ? src.slice(1)
        : relative(DOCS, resolve(dirname(f), src)).replace(/\\/g, '/');
      if (!actual.has(resolved)) {
        errors.push({ file: rel(f), msg: `图片缺失: "${resolved}"` });
      }
    }
  }
  return errors;
}

// ─── 6. 代码块语言标识

function checkFenceLanguage(files) {
  const errors = [];
  for (const f of files) {
    const lines = read(f).split('\n');
    let open = false;
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(/^(`{3,})(\S*)\r?$/);
      if (m && m[1].length === 3) {
        if (!open && m[2] === '') {
          // Bare opener fence - missing language identifier
          errors.push({ file: rel(f), line: i + 1, msg: `第 ${i+1} 行: 代码围栏缺少语言标识` });
        }
        open = !open;
      }
    }
  }
  return errors;
}

// ════════════════════════════════════════════════════════════
//  规范检查
// ════════════════════════════════════════════════════════════

// ─── 7. 术语大小写

const TERM_RULES = [
  [/\bjson\b/g,                 'JSON',     '应用 JSON（全大写）'],
  [/\bsdk\b(?!\s*：)/g,         'SDK',      '应用 SDK（全大写）'],
  [/\bapi\b(?![-/])/g,          'API',      '应用 API（全大写）'],
  [/\bros\b/g,                  'ROS',      '应用 ROS（全大写）'],
  [/\bdemo\b/g,                 'Demo',     '应用 Demo（首字母大写）'],
  [/\bpython\b/g,               'Python',   '应用 Python（首字母大写）'],
  [/\blinux\b(?!\s*kernel)/g,   'Linux',    '应用 Linux（首字母大写）'],
  [/\bwindows\b(?!\s*10)/g,     'Windows',  '应用 Windows（首字母大写）'],
  [/\bethercat\b/gi,            'EtherCAT', '应用 EtherCAT'],
  [/\bmingw\b/gi,               'MinGW',    '应用 MinGW'],
  [/\bmsvc\b/gi,                'MSVC',     '应用 MSVC'],
  [/\brelease\b/g,              'Release',  '应用 Release（首字母大写）'],
  [/\bdebug\b(?!\s*模式)/g,     'Debug',    '应用 Debug（首字母大写）'],
];

function checkTermCase(files) {
  const errors = [];
  for (const f of files) {
    if (!rel(f).startsWith('zh/')) continue;
    const prose = stripCode(read(f));
    for (const [re, correct, msg] of TERM_RULES) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(prose)) !== null) {
        if (m[0] === correct) continue;
        const before = prose.slice(0, m.index);
        const line = (before.match(/\n/g) || []).length + 1;
        errors.push({ file: rel(f), line, msg: `术语规范: "${m[0]}" → "${correct}"（${msg}）` });
      }
    }
  }
  return errors;
}

// ─── 8. 中英文间距

function checkCjkSpacing(files) {
  const errors = [];
  for (const f of files) {
    if (!rel(f).startsWith('zh/')) continue;
    const prose = stripCode(read(f));
    const lines = prose.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^#/.test(line) || /^\|/.test(line)) continue;

      // CJK + Latin
      let m;
      const re1 = /([\u4e00-\u9fff\u3400-\u4dbf])([a-zA-Z])/g;
      while ((m = re1.exec(line)) !== null) {
        errors.push({ file: rel(f), line: i + 1, msg: `中英文间距: "${m[0]}" → "${m[1]} ${m[2]}"` });
      }
      // Latin + CJK
      const re2 = /([a-zA-Z])([\u4e00-\u9fff\u3400-\u4dbf])/g;
      while ((m = re2.exec(line)) !== null) {
        errors.push({ file: rel(f), line: i + 1, msg: `中英文间距: "${m[0]}" → "${m[1]} ${m[2]}"` });
      }
    }
  }
  return errors;
}

// ─── 9. 文件命名

function checkFileNaming(files) {
  const errors = [];
  const seqMap = {};

  for (const f of files) {
    const rp = rel(f);
    const parts = rp.split('/');
    if (parts.length < 2 || !LANG_DIRS.has(parts[0])) continue;

    const name = parts[parts.length - 1];
    if (name === 'index.md' || name === '文档贡献指南.md' || name === 'README.md') continue;

    if (!/^\d{2}\..+\.md$/.test(name)) {
      errors.push({ file: rp, msg: `命名格式: "${name}" 不符合 "{序号}.{名称}.md"` });
    }

    // Check for duplicate sequences
    const sm = name.match(/^(\d{2})\./);
    if (sm) {
      const lang = parts[0];
      if (!seqMap[lang]) seqMap[lang] = {};
      if (!seqMap[lang][sm[1]]) seqMap[lang][sm[1]] = [];
      seqMap[lang][sm[1]].push(rp);
    }
  }

  for (const [lang, seqs] of Object.entries(seqMap)) {
    for (const [seq, list] of Object.entries(seqs)) {
      if (list.length > 1) {
        errors.push({ file: `${lang}/`, msg: `序号重复 ${seq}: ${list.map(x => x.split('/').pop()).join(', ')}` });
      }
    }
  }
  return errors;
}

// ─── 10. 警告/提示格式

function checkAdmonition(files) {
  const errors = [];
  for (const f of files) {
    if (!rel(f).startsWith('zh/')) continue;
    const lines = read(f).split('\n');
    for (let i = 0; i < lines.length; i++) {
      const m1 = lines[i].match(/^>\s*\*{1,2}(警告|注意|提示|说明|安全|Note|Warning|Tip|Info|Danger)\*{0,2}[：:]/);
      if (m1) {
        errors.push({ file: rel(f), line: i + 1, msg: `格式规范: 建议用 ::: 容器代替 "> **${m1[1]}**："` });
        continue;
      }
      const m2 = lines[i].match(/^>\s*(说明|注意|提示|警告|安全)[：:]/);
      if (m2) {
        errors.push({ file: rel(f), line: i + 1, msg: `格式规范: 建议用 ::: 容器代替 "> ${m2[1]}："` });
      }
    }
  }
  return errors;
}

// ─── Reporter

function report(name, errors, isWarning) {
  if (errors.length === 0) return console.log(`  ${String.fromCharCode(0x2705)} ${name} — 通过`), 0;
  const s = isWarning ? '\u26a0\ufe0f' : '\u274c';
  const t = isWarning ? '警告' : '错误';
  console.log(`  ${s} ${name} — ${errors.length} 个${t}`);
  for (const e of errors.slice(0, 20)) console.log(`       ${e.file}${e.line ? ':'+e.line : ''}  ${e.msg}`);
  if (errors.length > 20) console.log(`       ... 还有 ${errors.length - 20} 个未显示`);
  return isWarning ? 0 : errors.length;
}

// ─── Main

const files = getAllMdFiles(DOCS);
console.log(`\nSDK 文档质量检查 — ${DOCS}\n   ${files.length} 个文件\n`);

let err = 0;
err += report('1. 未闭合代码围栏', checkCodeFences(files));
err += report('2. 空页面/近空页面', checkEmptyPages(files));
err += report('3. 重复一级标题', checkDuplicateH1(files));
err += report('4. 站内链接', checkInternalLinks(files));
err += report('5. 图片文件', checkImages(files));
const w1 = report('6. 代码块语言标识', checkFenceLanguage(files), true);

const w2 = report('7. 术语大小写规范', checkTermCase(files), true);
const w3 = report('8. 中英文间距规范', checkCjkSpacing(files), true);
const w4 = report('9. 文件命名规范', checkFileNaming(files), true);
const w5 = report('10. 警告/提示格式规范', checkAdmonition(files), true);

// ════════════════════════════════════════════════════════════
//  语言结构检查
// ════════════════════════════════════════════════════════════

function checkLangStructure() {
  const allLangs = {};
  for (const f of files) {
    const rp = rel(f);
    const parts = rp.split('/');
    if (parts.length < 2) continue;
    const lang = parts[0];
    if (!['zh', 'en', 'kr'].includes(lang)) continue;
    // Normalize: keep only the structural part (remove filename)
    const dirPath = parts.slice(0, -1).join('/');
    if (!allLangs[lang]) allLangs[lang] = { files: 0, dirs: new Set() };
    allLangs[lang].files++;
    allLangs[lang].dirs.add(dirPath);
  }

  const errors = [];
  const counts = Object.fromEntries(
    Object.entries(allLangs).map(([k, v]) => [k, { files: v.files, dirs: v.dirs.size }])
  );

  // Check file count parity
  const fileCounts = Object.values(counts).map(c => c.files);
  if (new Set(fileCounts).size > 1) {
    const max = Math.max(...fileCounts);
    const min = Math.min(...fileCounts);
    errors.push({ file: 'docs/', msg: `三语言文件数不均衡: ${JSON.stringify(counts)}（最多相差 ${max - min} 个）` });
  }

  // Check dir count parity
  const dirCounts = Object.values(counts).map(c => c.dirs);
  if (new Set(dirCounts).size > 1) {
    const max = Math.max(...dirCounts);
    const min = Math.min(...dirCounts);
    errors.push({ file: 'docs/', msg: `三语言目录数不均衡: ${JSON.stringify(counts)}（最多相差 ${max - min} 个）` });
  }

  return errors;
}

// ════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════
//  环境检查
// ════════════════════════════════════════════════════════════

function checkVitepressVersion() {
  const pkgPath = join(ROOT, 'package.json');
  let pkg;
  try { pkg = JSON.parse(read(pkgPath)); } catch { return []; }
  const dep = pkg.dependencies?.vitepress || pkg.devDependencies?.vitepress || '';
  // Extract version from dep string (e.g., "2.0.0-alpha.18" or "^2.0.0-alpha.18")
  const verMatch = dep.match(/(\d+\.\d+\.\d+(?:-[\w.]+)?)/);
  if (!verMatch) return [];
  const currentVer = verMatch[1];
  // Check if it's an alpha/beta/rc
  if (currentVer.includes('alpha') || currentVer.includes('beta') || currentVer.includes('rc')) {
    return [{
      file: 'package.json',
      msg: `VitePress ${currentVer} 为预发布版本。最新稳定版为 1.6.4（需注意 2.x→1.x 配置不兼容），当前版本可正常运行，建议关注 VitePress 2.0 正式版发布。`
    }];
  }
  return [];
}

const langIssues = report('11. 三语言结构对应', checkLangStructure(), true);

const envIssues = checkVitepressVersion();
console.log(`\n  ${envIssues.length ? '⚠️' : '✅'} 12. 环境检查 — ${envIssues.length ? envIssues.length + ' 个注意项' : '通过'}`);
for (const e of envIssues) console.log(`       ${e.file}  ${e.msg}`);

const totalWarnings = w1 + w2 + w3 + w4 + w5 + langIssues;
process.exit(err > 0 ? 1 : (w1+w2+w3+w4+w5 > 0 ? 2 : 0));
