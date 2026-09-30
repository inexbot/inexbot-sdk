# AGENTS.md

> 本文件面向 AI 助手 / 自动化工具（AI coding agents & automation）。
> 这里是纳博特机器人 SDK 文档站（open.inexbot.com）的构建源仓库。**先读下面四条，再开始生成代码**：

1. **Agent 开发指引**（任务→文档索引 / 生成流程 / 避坑）：https://open.inexbot.com/zh/13.Agent%20%E5%BC%80%E5%8F%91%E6%8C%87%E5%BC%95.html
2. **生成前信息采集清单**：https://open.inexbot.com/zh/15.%E7%94%9F%E6%88%90%E5%89%8D%E4%BF%A1%E6%81%AF%E9%87%87%E9%9B%86%E6%B8%85%E5%8D%95.html
3. **机器可读入口**：https://open.inexbot.com/llms.txt（全量：/llms-full.txt；每页 .html 换 .md 即纯文本版）
4. **SDK 资源仓库**（头文件 / 库 / 示例，可 clone）：https://cnb.cool/inexbot/inexbot-sdk-devkit

默认开发方式：上位机 SDK（C++ / C# / Python）——优先走 `docs/zh/04.上位机/`；其他通道仅在上位机无法满足或客户主动提出时使用。

站内入口页：`docs/zh/00.AI 助手先读/` 与 `docs/zh/04.上位机/00.AI 助手先读.md`。

约定：生成前先问清楚（勿默认假设）；函数名以站内接口页与真实头文件核验为准（勿凭记忆书写）。
