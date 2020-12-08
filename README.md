### 项目使用

```sh
git clone https://github.com/weblmz/multi-page-vue.git # 克隆仓库

cd multi-page-vue # 进入目录

yarn          # 安装项目依赖

yarn gen:page # 添加新页面

yarn dev      # 启动开发环境

yarn build    # 打包多页应用

yarn lint     # 检查项目语法规范

yarn add element-ui # 添加新包

```

> plop 用于快速构建新页面

> axios 用于网络请求

> mockjs 用于没有后端配合时的 api 数据模拟，mockjs 本身是假的数据模拟，并不产生真是请求，所以使用 node 中间件搭建 mock 服务端，模拟真实请求，在线上模拟请求时，仍使用原有能力。

> autoprefixer 用于自动添加 css 前缀

> @babel/plugin-transform-runtime -D // 处理 js 内置语法 api 如 function * gen() { yield 1; }; promise 等 *需要在 babel.config.js 中配置 sourceType: 'unambiguous'以区分 commonjs 和 es6 的导入导出方式

> chokidar 监控文件变化

> .env.development .env.production 配置环境变量 process.env[vari]

> yarn add svgo svgo-loader svg-sprite-loader -D

> 添加 svgo-config.yml配置，配置vue.config.js 添加SvgIcon组件 往 src/icons 文件夹下添加.svg 文件即可使用组件 svg-icon 引用 svg
