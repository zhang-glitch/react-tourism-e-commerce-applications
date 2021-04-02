'use strict';

const user = require("../model/user");
const BaseService = require("./base")

class CommentService extends BaseService {

  // 获取评论, 需要houseId和userId
  async add(params) {
    return this.run(async (ctx) => {
      const res = await ctx.model.Comment.create(params)
      return res;
    })
  }

  // 获取评论接口
  async lists(params, userId) {
    return this.run(async (ctx, app) => {
      const res = await ctx.model.Comment.findAll({
        where: {
          houseId: params.id,
          userId
        },
        limit: params.pageSize,
        offset: (params.pageNum - 1) * params.pageSize,
        include: [
          {
            model: app.model.User,
            attributes: ["avatar"]
          }
        ]
      })
      return res
    })
  }

}

module.exports = CommentService