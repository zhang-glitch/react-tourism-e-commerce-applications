


const BaseController = require("./base");

class CommentController extends BaseController {

  async add() {
    const { ctx } = this;
    // 获取用户id
    const user = await ctx.service.user.getUser(ctx.username);
    // 获取houseId
    const { houseId, comment } = ctx.request.body;
    const result = await ctx.service.comment.add({
      userId: user.id,
      houseId,
      msg: comment,
      createTime: ctx.helper.formatTime()
    })

    if (result) {
      this.success(result)
    } else {
      this.error("添加评论失败")
    }
  }

  async lists() {
    const { ctx } = this;
    const { id } = await ctx.service.user.getUser(ctx.username);
    const params = ctx.request.body;
    const result = await ctx.service.comment.lists(params, id);
    if (result) {
      this.success(result)
    } else {
      this.error("暂无评论")
    }
  }
}


module.exports = CommentController