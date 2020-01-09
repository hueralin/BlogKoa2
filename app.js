const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
// JSON格式处理
const json = require('koa-json')
const onerror = require('koa-onerror')
// 处理POST数据
const bodyparser = require('koa-bodyparser')
// 日志处理
const logger = require('koa-logger')
// session
const session = require('koa-generic-session')
// redis
const redisStore = require('koa-redis') 
// 路由
const index = require('./routes/index')
const users = require('./routes/users')
const blog = require('./routes/blog')
const user = require('./routes/user')

// error handler
onerror(app)

// middlewares

// 解析POST上传的数据
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// 并转为JSON格式
app.use(json())

// 日志
app.use(logger())
// 静态文件目录（前端）
app.use(require('koa-static')(__dirname + '/public'))
// 模板（前端）
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
// 计算当前服务请求的耗时
app.use(async (ctx, next) => {
  const start = new Date()
  // 处理 接下来的事
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session配置
app.keys = ['qw34f*6Y4PPb(#@']
// 注册session中间件，使得ctx有了session属性
app.use(session({
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24*60*60*1000
  },
  // 配置redis (记得启动redis-server)
  store: redisStore({
    // 先写死本地的redis server
    all: '127.0.0.1:6379'
  })
}))

// routes 注册路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
