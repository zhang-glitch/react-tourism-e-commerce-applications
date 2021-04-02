'use strict';

const md5 = require("md5")

const BaseService = require("./base")

class UserService extends BaseService {

  // 获取用户
  async getUser(username, password) {
    return this.run(async (ctx, app) => {
      const _where = password ? { username, password: md5(password + app.config.salt) } : { username }
      const res = await ctx.model.User.findOne({
        where: _where
      })
      return res;
    })
  }

  // 添加用户
  async add(params) {
    return this.run(async (ctx) => {
      const res = await ctx.model.User.create(params)
      return res;
    })
  }

  // 编辑用户
  async edit(params) {
    return this.run(async (ctx) => {
      try {
        const res = await ctx.model.User.update(params, {
          where: {
            username: ctx.username
          }
        })
        return res;
      } catch (error) {
        console.log(error)
        return null;
      }
    })
  }
}

module.exports = UserService