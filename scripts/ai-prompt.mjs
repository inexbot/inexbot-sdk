/**
 * ai-prompt.mjs —— 面向客户 AI 助手的「自装技能包」提示词（**单一源**）
 * ------------------------------------------------------------------
 * 用途：客户把这段文字整段复制，发给他自己的 AI 助手（Claude Code / Cursor /
 *       WorkBuddy / 通义灵码 …），由该助手取回技能包并装到自己的技能目录。
 *
 * 单一源原则：本文件是唯一副本，三处输出都由它生成，改这里即可（不要分别改网页与 txt）：
 *   1. docs/zh/index.md 里的占位符 <!--AI_PROMPT_ZH--> → 构建时渲染成可复制的代码块
 *   2. dist/zh/index.md（每页纯 Markdown 副本）→ 构建后把占位符替换为同样的代码块
 *   3. dist/ai-prompt.txt（站点根，供直接抓取：https://open.inexbot.com/ai-prompt.txt）
 *
 * ⚠️ 改本文件后必须核对：
 *   ① 取用方式要三选一（用户 2026-10-10 指示「devkit 远端仓库已更新，现在重新修改文档站的链接」）——
 *      远端直链在 devkit 推送到位前一律 404，故当时只给 devkit 内路径（v0.42）；**推送后（2026-10-10 提交
 *      `093988f`，13/13 直链回读 200）已恢复三件套**：已有 devkit 直接取 / `git clone` / 远端纯文本直链前缀，
 *      让「只能抓取、不能克隆」的 Agent 也能装（实录六/七的实测约束）。同页 13 页 §7 的 10 条远端直链保持不动。
 *   ② 百分号编码（`11-SKILL技能包` → `11-SKILL%E6%8A%80%E8%83%BD%E5%8C%85`）；
 *   ③ 技能包内文件数（当前 8 个：SKILL.md ＋ references/×4 ＋ scripts/×3）。
 *   核对对象：11-SKILL技能包/投放说明.txt 与 sdk-docs-workflow 技能的
 *   references/agent-platform-skill-matrix.md、references/agent-kit-devkit-package.md。
 */

export const AI_PROMPT_PLACEHOLDER = '<!--AI_PROMPT_ZH-->'

export const AI_PROMPT_ZH = [
  '你是可以联网、可以读写本地文件的 AI 编程助手。请帮我安装「纳博特（iNexbot）工业机器人二次开发」技能包（SKILL），之后我做二次开发时按它工作。',
  '',
  '【第 1 步】取回技能包（共 8 个文件：SKILL.md ＋ references/ ×4 ＋ scripts/ ×3；要全部取回，不要只取 SKILL.md）',
  '  位置：SDK 资源仓库 devkit（https://cnb.cool/inexbot/inexbot-sdk-devkit）→ 11-SKILL技能包/inexbot-sdk-dev/',
  '  取法任选一种：',
  '   · 已经有 devkit：直接取上面这个目录',
  '   · 克隆：git clone --depth 1 https://cnb.cool/inexbot/inexbot-sdk-devkit ，再取 11-SKILL技能包/inexbot-sdk-dev/',
  '   · 只要文件（纯文本直链前缀，逐个取；%E6%8A%80%E8%83%BD%E5%8C%85 已是编码，请勿改动）：',
  '     https://cnb.cool/inexbot/inexbot-sdk-devkit/-/git/raw/main/11-SKILL%E6%8A%80%E8%83%BD%E5%8C%85/inexbot-sdk-dev/<文件相对路径>',
  '',
  '【第 2 步】装到你自己的技能目录 —— 按你的平台的约定自行判断该放哪',
  '  以技能方式安装（目录名保持 inexbot-sdk-dev；取回的内容要完整：目录内 SKILL.md 与 references/、scripts/ 必须同时存在，只放 SKILL.md 会导致附件全丢）',
  '  若你的平台不支持技能机制，则改用技能包根部的 AGENTS.md（复制到项目根，或按你的平台约定改名）',
  '  装完把实际路径告诉我。',
  '',
  '【第 3 步】装好后：① 确认取到的是完整目录（SKILL.md ＋ references/ 4 个文件 ＋ scripts/ 3 个文件，共 8 个）；② 读一遍 SKILL.md 与 references/doc-map.md；③ 向我复述：你装到了哪里、以及正式开发前你需要我提供哪些信息。',
  '',
  '【后续开发时】按 SKILL.md 的流程与 references/ 里的资料地图、避坑清单、验证 SOP 工作；文档权威来源是 https://open.inexbot.com（另有 llms.txt / llms-full.txt，任意页面把 .html 换成 .md 即纯文本）；接口名、端口、版本一律以官网页面为准，不要臆造。',
].join('\n')
