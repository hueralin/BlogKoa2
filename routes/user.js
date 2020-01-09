const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
    const { username, password } = ctx.request.body   // 相当于req.body
    ctx.body = {
        code: 0,
        username,
        password
    }
})

router.get('/session-test', async (ctx, next) => {
    if(ctx.session.viewCount == null) {
        ctx.session.viewCount = 0;
    }
    ctx.session.viewCount++;
    ctx.body = {
        code: 0,
        viewCount: ctx.session.viewCount
    }
})

module.exports = router
