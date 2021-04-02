module.exports = options => {
  return async function adminauth(ctx, next) {
    // const url = ctx.request.url;
    // console.log("url", url.split("?"[0]))
    const sessionValue = ctx.session[ctx.username]
    // 获取请求传递的token
    const token = ctx.request.header.token;
    // 判断前端和后端的token是否相等
    const user = sessionValue ? sessionValue === token : sessionValue;
    // console.log("user", user)
    if (!user && !options.exclude.includes(ctx.request.url.split("?")[0])) {
      ctx.body = { status: 1001, data: '用户未登录' }
    } else {
      await next()
    }
  }
}