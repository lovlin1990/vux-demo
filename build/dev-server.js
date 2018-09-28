// 检测node,npm版本
require('./check-versions')()

//配置文件
var config = require('../config')
// 如果node的环境无法判断当前是dev/product环境
// 使用config.dev.env.NODE_ENV作为当前的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// 可以强制打开浏览器并跳转到指定的url的插件
var opn = require('opn')
// node自带的文件路径工具
var path = require('path')
// express组件
var express = require('express')
var webpack = require('webpack')
// 测试环境，使用的配置与生产环境的配置一样
// 非测试环境，即为开发环境，因为此文件只有测试环境和开发环境使用
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf') // 生产环境配置
  : require('./webpack.dev.conf') // 开发环境配置

// 端口号为命令行输入的PORT参数或者配置文件中的默认值
var port = process.env.PORT || config.dev.port
// 配置文件中 是否自动打开浏览器
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// 配置文件中 http代理配置
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

// 启动 express 服务
var app = express()
// 启动webpack编译
var compiler = webpack(webpackConfig)

// 可以将编译后的文件暂存到内存中的插件
// https://github.com/webpack/webpack-dev-middleware
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath, // 公共路径，与webpack的publicPath一样
  quiet: true // 不打印
})

// Hot-reload 热重载插件
// https://github.com/glenjamin/webpack-hot-middleware
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// 当html-webpack-plugin template更改之后，强制刷新浏览器
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// 将 proxyTable 中的请求配置挂载到启动的 express 服务商
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  // 如果options的数据类型为string,则表示只设置了url
  // 所以需要将url设置为对象中的target的值
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// 使用 connect-history-api-fallback 匹配资源
// 如果不匹配就可以重定向到指定地址
// https://github.com/bripkens/connect-history-api-fallback
app.use(require('connect-history-api-fallback')())
// 将暂存到内存中的webpack编译后的文件挂载到express服务上
app.use(devMiddleware)

// 将 Hot-reload挂载到express服务上
app.use(hotMiddleware)

// 拼接static文件夹的静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// 静态文件服务
app.use(staticPath, express.static('./static'))
// 设置启动的地址
var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
//编译成功后打印网址信息
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // 如果配置了自动打开浏览器，且不是测试环境，则自动打开浏览器并跳到我们的开发环境
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
