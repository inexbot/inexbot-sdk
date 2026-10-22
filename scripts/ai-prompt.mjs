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
 *   ③ 本提示词**只给入口与要点**，详细取法/判据/排查都在 devkit 的
*      `11-SKILL技能包/安装与取包.md`（唯一详版）。**改那个文件时，回来核对本提示词的 3 条要点**
*      （文件数 10 ／ 取全判据 ／ 兜底路径）；
*   ④ **技能包版本号硬编码在本提示词里（当前 `v0.2.0`）—— 技能包升版时必须回来同步改这里**，
 *      并重跑文档站构建；联动清单见 devkit `11-SKILL技能包/安装与取包.md`「改技能包版本号时的联动清单」；
 *   ⑤ 技能包内文件数（当前 **10** 个：SKILL.md 1 ＋ references×5 ＋ scripts×4）；
*      取全判据以仓库内 `11-SKILL技能包/文件清单与校验值.txt` 为准（字节数 + SHA256 前 12）。
 *   核对对象：11-SKILL技能包/投放说明.txt 与 sdk-docs-workflow 技能的
 *   references/agent-platform-skill-matrix.md、references/agent-kit-devkit-package.md。
 */

export const AI_PROMPT_PLACEHOLDER = '<!--AI_PROMPT_ZH-->'

export const AI_PROMPT_ZH = [
  '你是可以联网、可以读写本地文件的 AI 编程助手。请帮我安装「纳博特（iNexbot）工业机器人二次开发」技能包（SKILL，**当前版本 v0.2.0**），之后我做二次开发时按它工作。',
  '',
  '【第 1 步】取回《安装与取包》说明（**这是唯一详版，请按它操作**）：',
  '  https://cnb.cool/inexbot/inexbot-sdk-devkit/-/git/raw/main/11-SKILL%E6%8A%80%E8%83%BD%E5%8C%85/%E5%AE%89%E8%A3%85%E4%B8%8E%E5%8F%96%E5%8C%85.md',
  '  取不到该文件时，任选一条兜底：① 克隆 https://cnb.cool/inexbot/inexbot-sdk-devkit ，再读 11-SKILL技能包/安装与取包.md；② 打开 https://open.inexbot.com/zh/13.Agent%20%E5%BC%80%E5%8F%91%E6%8C%87%E5%BC%95.md 看第 7 节。',
  '',
  '【第 2 步】按该说明把技能包**取全**（共 12 个文件：SKILL.md 1 个 ＋ references/ 6 个 ＋ scripts/ 5 个；不要只取 SKILL.md），并装到你自己的技能目录（放哪按你平台的约定自行判断）。**装完请核对版本应为 v0.2.0**；若你本地已有装的旧版（版本号低于 v0.2.0），按《安装与取包》的「更新已安装的技能」整目录覆盖更新。',
  '',
  '【第 3 步】装完向我复述：你装到了哪里、取自哪个地址、以及正式开发前需要我提供哪些信息。',
  '',
  '【后续开发时】按技能包 SKILL.md 的流程与 references/ 工作；文档权威来源是 https://open.inexbot.com（另有 llms.txt / llms-full.txt，任意页面把 .html 换成 .md 即纯文本，仅此单向）；接口名、端口、版本一律以官网页面为准，不要臆造。',
].join('\n')
