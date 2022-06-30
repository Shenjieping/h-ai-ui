import Text from './text/index.js'
import Button from './button/index.js'
import Alert from './alert/index.js'
import Table from './table/index.js'
/* import component */

const components = [
  Text,
  Button,
  Alert,
  Table
  /* install component */
]

const install = function (Vue, opts = {}) {
  // 判断是否已经安装
  if (install.installed) return
  install.installed = true

  components.map((component) => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '1.0.0',
  install,
  ...components
}
