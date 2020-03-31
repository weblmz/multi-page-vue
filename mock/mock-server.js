const Mock = require('mockjs')
const bodyParser = require('body-parser')
const path = require('path')
const mockDir = path.join(process.cwd(), 'mock')
const chokidar = require('chokidar')
const chalk = require('chalk')

const genDynamicApis = apis => {
  return apis.map(({ url, type = 'post', answer }) => {
    return {
      url: new RegExp(`/mock${url}`),
      type,
      response(req, res) {
        res.json(Mock.mock(answer instanceof Function ? answer(req, res) : answer))
      }
    }
  })
}

function registApis(app, apis) {
  let mockLastIndex
  for (const api of apis) {
    app[api.type](api.url, api.response)
    mockLastIndex = app._router.stack.length
  }
  const mockApisCount = apis.length
  return {
    mockApisCount,
    mockStartIndex: mockLastIndex - mockApisCount
  }
}

function unRegistApis() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

module.exports = app => {
  // es6 polyfill
  require('@babel/register')

  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  const mockApis = registApis(app, genDynamicApis(require('./apis')))
  var mockApisCount = mockApis.mockApisCount
  var mockStartIndex = mockApis.mockStartIndex

  // 监控mock文件，热更新mock-server
  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true
    })
    .on('all', (event, path) => {
      if (event === 'change' || event === 'add') {
        try {
          // 移除mock api栈
          app._router.stack.splice(mockStartIndex, mockApisCount)

          // 清除api缓存
          unRegistApis()

          const mockApis = registApis(app, genDynamicApis(require('./apis')))
          mockApisCount = mockApis.mockApisCount
          mockStartIndex = mockApis.mockStartIndex

          console.log(chalk.magentaBright(`\n > Mock Server 已更新!  ${path}`))
        } catch (error) {
          console.log(chalk.redBright(error))
        }
      }
    })
}
