const fs = require('fs')
const path = require('path')
const md = require('markdown-it')()
const slugify = require('transliteration').slugify

const resolve = dir => path.resolve(__dirname, dir)
const join = path.join
// build生成多入口路径
function getEntries (path) {
  let files = fs.readdirSync(resolve(path));
  const themeIndex = files.indexOf('theme-chalk')
  if (themeIndex > -1) {
    files.splice(themeIndex, 1)
  }
  const entries = files.reduce((ret, item) => {
    const itemPath = join(path, item)
    const isDir = fs.statSync(itemPath).isDirectory()
    if (isDir) {
      ret[item] = resolve(join(itemPath, 'index.js'))
    } else {
      const [name] = item.split('.')
      ret[name] = resolve(`${itemPath}`)
    }
    return ret
  }, {})
  return entries
}

// 启动配置
const devConfig = {
  // 修改 pages 入口
  pages: {
    index: {
      entry: 'examples/main.js', // 入口
      template: 'public/index.html', // 模板
      filename: 'index.html' // 输出文件
    }
  },
  outputDir: 'dist',
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  parallel: false, //解决打包时,报错问题  https://github.com/QingWei-Li/vue-markdown-loader/issues/61
  // 扩展 webpack 配置
  chainWebpack: config => {
    // @ 默认指向 src 目录，这里要改成 examples
    config.resolve.alias
      .set('@', path.resolve('examples'))
      .set('~', path.resolve('packages'))
      .set('src', path.resolve('src'))

    // 把 packages 和 examples 加入编译，因为新增的文件默认是不被 webpack 处理的
    config.module
      .rule('js')
      .include.add(/packages/)
      .end()
      .include.add(/examples/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
    // 处理markdown
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .loader(resolve('./build/md-loader/index.js')) // 参考element-ui的md处理 https://github.com/ElemeFE/element/blob/HEAD/build/md-loader/index.js
  }
};

// 打包配置
const buildConfig = {
  css: {
    sourceMap: true,
    extract: {
      filename: 'style/[name].css'
    }
  },
  configureWebpack: {
    entry: {
      ...getEntries('packages')
    },
    output: {
      filename: '[name].js',
      libraryTarget: 'commonjs2'
    }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('hmr')
    config.entryPoints.delete('app')

    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(option => {
        option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
        return option
      })
  },
  outputDir: 'lib',
  productionSourceMap: false
}
const node_env = process.env.NODE_ENV
const build_type = process.env.BUILD_TYPE
module.exports = node_env === 'development' || build_type === 'deploy' ? devConfig : buildConfig
