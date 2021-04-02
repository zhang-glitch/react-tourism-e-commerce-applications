'use strict';

const BaseController = require("./base")
const md5 = require("md5")

class UserController extends BaseController {

  async useJwt({ id, username }) {
    const { ctx, app } = this;

    // 使用jwt
    const token = app.jwt.sign({
      id,
      username
    }, app.config.jwt.secret);
    // 设置session
    ctx.session[username] = token;
    return token;
  }

  resultData(ctx, result) {
    return {
      ...ctx.helper.unPick(result.dataValues, ["password"]),
      createTime: ctx.helper.timestamp(result.dataValues.createTime)
    }
  }

  // 注册接口
  async register() {
    const { ctx, app } = this;
    const params = ctx.request.body;
    const res = await ctx.service.user.getUser(params.username)
    if (res) {
      this.error("用户已存在");
      return;
    }

    const isSuccess = await ctx.service.user.add({
      ...params,
      // 给密码加密存入数据库
      password: md5(params.password + app.config.salt),
      createTime: ctx.helper.formatTime()
    })

    if (isSuccess) {

      const token = await this.useJwt({
        id: isSuccess.id,
        username: isSuccess.username
      });
      this.success({
        ...this.resultData(ctx, isSuccess),
        token
      });
    } else {
      this.error("用户注册失败")
    }
  }

  // 登录接口
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const isLogin = await ctx.service.user.getUser(username, password);
    if (isLogin) {
      const token = await this.useJwt({
        id: isLogin.id,
        username: isLogin.username
      });
      this.success({
        ...this.resultData(ctx, isLogin),
        isSuccess: true,
        token
      })
    } else {
      this.error("密码或者用户名错误");
    }
  }

  // 详情接口
  async getDetail() {
    const { ctx } = this;
    // 通过用户名获取详情页信息
    // 获取username
    const username = ctx.username;
    const detail = await ctx.service.user.getUser(username);
    if (detail) {
      this.success({
        ...this.resultData(ctx, detail)
      })
    } else {
      this.error("用户不存在");
    }
  }

  // 退出接口
  async logout() {
    const { ctx } = this;
    // 清空session
    // 在前端删除所有的localStorage选项。
    // localStorage.clear()
    try {
      ctx.session[ctx.username] = null;
      this.success("OK")
    } catch (error) {
      this.error("退出登录失败");
    }
  }

  // 编辑接口
  async edit() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.user.edit({
      ...params,
      updateTime: ctx.helper.formatTime(),
      // password: md5(params.password + app.config.salt)// 不能修改密码
    });
    if (res) {
      this.success("编辑成功")
    } else {
      this.error("编辑失败");
    }
  }
}

module.exports = UserController;
