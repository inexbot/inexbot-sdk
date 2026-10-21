import { h } from 'vue'
import Theme from 'vitepress/theme'
import './custom.css'
import AnalyticsTracker from './analytics'

export default {
  extends: Theme,
  // 在 Layout 顶部挂一个零渲染组件：只负责 404 判定与四个业务事件（search/notfound/download/copy_prompt）。
  // pageview 由 config.mts 注入的 umami tracker 自动采集，不在这里做。
  Layout: () =>
    h((Theme as any).Layout, null, {
      'layout-top': () => h(AnalyticsTracker)
    })
}
