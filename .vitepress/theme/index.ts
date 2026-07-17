import Theme from 'vitepress/theme'
import { watch } from 'vue'
import { useRoute } from 'vitepress'

export default {
  extends: Theme,
  setup() {
    const route = useRoute()
    // 监听路由变化，记录用户选择的语言
    watch(() => route.path, (path) => {
      if (path.startsWith('/en/') || path === '/en') {
        localStorage.setItem('vp-lang', 'en')
      } else {
        localStorage.setItem('vp-lang', 'zh')
      }
    })
  }
}
