import Vue from "vue"
import App from "./App"
import router from "./router"
import AiUi from "~/index"
import demoBlock from "./components/demo-block" // demo模板
import hljs from "highlight.js"
import 'highlight.js/styles/color-brewer.css' // 代码高亮样式

import '~/theme-chalk/src/index.scss' // 组件样式
import "./assets/scss/index.scss" //公共样式
import "./demo-styles/index.scss" //文档 展示样式

import ElementUI from 'element-ui'

Vue.use(ElementUI)

router.afterEach(route => {
  Vue.nextTick(() => {
    scrollTo(0, 0)
    const blocks = document.querySelectorAll("pre code:not(.hljs)")
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
})

Vue.use(AiUi)
Vue.component("demo-block", demoBlock)

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
