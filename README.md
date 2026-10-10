# 纳博特 SDK 文档（open.inexbot.com 源仓库）

纳博特（iNexBot / NexDroid）开放平台**二次开发文档**的源仓库；构建产物发布在 <https://open.inexbot.com>（中文 `/zh/` ｜ English `/en/` ｜ 한국어 `/kr/`）。

> 默认开发方式为**上位机 SDK**（C++ / C# / Python）；JSON 协议、控制器 / 示教器、ROS、主站库、HAL 为进阶通道，仅在上位机无法满足或客户明确要求时使用。

## 🤖 给 AI 助手 / 自动化工具（先读这节）

| 入口 | 地址 |
| --- | --- |
| 文档索引（llms.txt） | <https://open.inexbot.com/llms.txt> |
| 全量文档（llms-full.txt） | <https://open.inexbot.com/llms-full.txt> |
| **Agent 开发指引**（任务索引 / 生成流程 / 避坑速查） | <https://open.inexbot.com/zh/13.Agent%20%E5%BC%80%E5%8F%91%E6%8C%87%E5%BC%95.html> |
| **生成前信息采集清单**（生成前先问客户，不要默认假设） | <https://open.inexbot.com/zh/15.%E7%94%9F%E6%88%90%E5%89%8D%E4%BF%A1%E6%81%AF%E9%87%87%E9%9B%86%E6%B8%85%E5%8D%95.html> |
| 编译与验证指南（无真机时 L1/L2/L3 三级验证） | <https://open.inexbot.com/zh/14.%E7%BC%96%E8%AF%91%E4%B8%8E%E9%AA%8C%E8%AF%81%E6%8C%87%E5%8D%97.html> |
| 相关下载 / 版本与兼容性 | <https://open.inexbot.com/zh/12.%E7%9B%B8%E5%85%B3%E4%B8%8B%E8%BD%BD.html> · <https://open.inexbot.com/zh/%E7%89%88%E6%9C%AC%E4%B8%8E%E5%85%BC%E5%AE%B9%E6%80%A7.html> |
| SDK 资源仓库（头文件 / 库 / 示例，可取单文件直链） | <https://cnb.cool/inexbot/inexbot-sdk-devkit> |

- **单页 Markdown**：把任意页面 URL 中的 `.html` 换成 `.md`，即为该页纯文本版本；
- 生成代码前请先读《生成前信息采集清单》并**先向客户确认**：语言 / 编译环境 / 是否有真实控制器与 IP·端口（默认 6001）——**不要默认假设**；
- 函数名以站内接口页为准（可在 SDK 头文件中核对），不要臆造；
- **Agent 套件**（技能 / 通用规则 / 避坑 / 自检）见 SDK 资源仓库 `11-Agent套件/`；**克隆该仓库即自带** `.agents/skills/inexbot-sdk-dev/SKILL.md`（支持 Agent Skills 的平台自动识别）。套件不含安装动作、无需执行脚本；
- 站点地图：<https://open.inexbot.com/sitemap.xml>。

## 📁 仓库结构

- `docs/zh/` · `docs/en/` · `docs/kr/` — 三语言文档源（Markdown · VitePress）
- `scripts/` — 构建与检查脚本（`generate-llms.mjs`：生成 `llms.txt` / `llms-full.txt` / 每页 `.md`；`check-docs-zh.mjs`：文档规范检查）
- `文档贡献指南.md` — 贡献方式说明；`API页面模板.md` — API 页模板

## 🔧 本地构建

```bash
npm install           # Node.js ≥ 20
npm run docs:build    # 构建站点（输出 dist/，并自动生成机器可读产物）
npm run docs:dev      # 本地预览
```
