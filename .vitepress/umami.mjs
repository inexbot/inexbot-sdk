// 访问统计（umami 自托管）—— 单一配置源
// 换 host（例如以后走 https 域名）只改这一处，config.mts 与 theme/analytics.ts 都从这里读。
// website-id 会随 tracker 脚本出现在页面 HTML 里，本身不是凭据（后台密码另存，不进仓库）。

export const UMAMI_ENABLED = true

// 采集端点（2026-10-21 起走 HTTPS 域名，浏览器 mixed content 问题已解除）
// 换 host 只改这一行；改完必须重新构建（tracker 的 src 是构建期写进每页 head 的）。
export const UMAMI_HOST = 'https://analytics.inexbot.com'

// 允许上报的站点域（umami tracker 的 data-domains）。本地 dev/preview 不会命中，避免污染统计。
export const UMAMI_SITE_HOST = 'open.inexbot.com'

// umami 后台「INEXBOT 文档站」的 website id
export const UMAMI_WEBSITE_ID = 'b93cba0e-a23c-4c2c-a151-2bcb805b7947'

// ── 会话回放（recorder.js）
// 代价：每页多加载 186 KB（tracker 只有 4.7 KB）；会把页面内容与输入行为录下来，
export const UMAMI_RECORDER_ENABLED = true

// recorder 允许上报的域：与统计一致，只放行生产域（本地 dev 不上报）
export const UMAMI_RECORDER_DOMAINS = UMAMI_SITE_HOST
