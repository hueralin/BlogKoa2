// Express: const router = require('express').Router()
// koa的路由独立于koa（koa-router是个单独的插件）
const router = require('koa-router')()

// ctx: context上下文
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
