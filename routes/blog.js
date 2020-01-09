const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
    const query = ctx.query
    ctx.body = {
        code: 0,
        query
    }
})

module.exports = router
