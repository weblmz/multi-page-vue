const path = require('path')
const glob = require('glob')

// 获取入口文件夹
const entries = glob.sync('src/pages/*')

// 生成pages配置对象
const pages = entries.reduce((result, cur) => {
  const pageGroup = glob.sync(cur + '/*')
  const pageIndex = cur.substring(cur.lastIndexOf('/') + 1)
  const page = {
    entry: pageGroup.find(v => v.endsWith('.js')),
    template: pageGroup.find(v => v.endsWith('.html')),
    filename: pageIndex + '.html'
  }
  result[pageIndex] = page
  return result
}, {})

const port = process.env.port || 9999

module.exports = {
  pages,
  devServer: {
    port,
    // open: true,
    overlay: { // 在浏览器显示编译错误不显示警告
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.APP_BASE_API]: {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.APP_BASE_API]: ''
        }
      }
    },
    // after(app) 提供在服务器内部的所有其他中间件之后执行定制中间件的功能
    // after: (app) => {}
    after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    }
  }
}
