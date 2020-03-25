const glob = require('glob')

// 获取入口文件夹
const entries = glob.sync('src/pages/*')

// 生成pages配置对象
const pages = entries.reduce((result, cur, index) => {
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

module.exports = { pages }
