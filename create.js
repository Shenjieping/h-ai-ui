/*
  自动生成组件
  在根目录下执行执行  node create.js componentName
*/
const path = require('path')
const fs = require('fs')

const resolve = dir => path.resolve(__dirname, dir)
const name = process.argv.slice(2)[0]

if (!name) {
  console.log('请传入组件名称！')
  return
}

const packagesFiles = fs.readdirSync(resolve('./packages'))
if (~packagesFiles.indexOf(name)) {
  console.log('该组件已经存在，停止创建！')
  return
}

// 组件创建
const upperName = name.replace(/^[a-z]/, (str) => str.toLocaleUpperCase())
const templateStr = 
`<template>
  <div :class="$options.name">
    ${name}组件
  </div>
</template>

<script>
export default {
  name: 'Ai${upperName}',
  data() {
    return {}
  },
  mounted() {}
}
</script>
`
const indexStr =
`import ${upperName} from './src/${name}.vue'

${upperName}.install = function (Vue) {
  Vue.component(${upperName}.name, ${upperName})
}

export default ${upperName}
`
fs.mkdirSync(resolve(`./packages/${name}`))
fs.mkdirSync(resolve(`./packages/${name}/src`))
fs.writeFileSync(resolve(`./packages/${name}/src/${name}.vue`), templateStr)
fs.writeFileSync(resolve(`./packages/${name}/index.js`), indexStr)

const cssIndex = fs.readFileSync(resolve('./packages/theme-chalk/src/index.scss'), 'utf-8')
const addCss = `@import "./${name}.scss";`
fs.writeFileSync(resolve(`./packages/theme-chalk/src/${name}.scss`), `.${name} {}`)
fs.writeFileSync(resolve(`./packages/theme-chalk/src/index.scss`), `${cssIndex}\n${addCss}`)


// 预览注册
const docStr =
`# ${name} 组件
----

## 基础用法

:::demo
\`\`\`html
<template>
  <ai-${name}></ai-${name}>
</template>
\`\`\`
:::

## Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| 文档     |  -  |  -  |     -          |    —     |

`
fs.writeFileSync(resolve(`./examples/docs/${name}.md`), docStr)

const navConfigStr = fs.readFileSync(resolve('./examples/nav.config.json'), 'utf-8')
const navConfig = JSON.parse(navConfigStr)
const keys = Object.keys(navConfig)
navConfig[keys[keys.length - 1]].push({
  "desc": `${upperName} 组件`,
  "name": name,
  "path": `/${name}`
})
const res = JSON.stringify(navConfig, null, '\t')
fs.writeFileSync(resolve('./examples/nav.config.json'), res.replace(/\t/g, '  '))


// 全局注册组件
const packagesIndex = fs.readFileSync(resolve('./packages/index.js'), 'utf-8')
const importStr = `import ${upperName} from './${name}/index.js'`
const importTag = '/* import component */'
const nameTag = '\n  /* install component */'
const addImport = `${packagesIndex.split(importTag)[0]}${importStr}\n${importTag}${packagesIndex.split(importTag)[1]}`
const addName = `${addImport.split(nameTag)[0]},\n  ${upperName}${nameTag}${addImport.split(nameTag)[1]}`
fs.writeFileSync(resolve('./packages/index.js'), addName)

console.log('创建成功')
