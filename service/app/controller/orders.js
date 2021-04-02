


const BaseController = require("./base");

class OrdersController extends BaseController {

  // 判断是否有这个订单，来渲染前端的订单已存在
  async hasOrder() {
    const { ctx } = this;
    const params = ctx.request.body;
    const result = await ctx.service.orders.hasOrder(ctx.userId, params);
    // if (result) {
    //   this.success("订单已存在")
    // } else {
    //   this.error("无此订单")
    //   // 前端调用添加订单接口，来添加此订单
    // }
    this.success(result)
  }

  // 添加订单
  async addOrder() {
    const { ctx } = this;
    const params = ctx.request.body;
    const result = await ctx.service.orders.addOrder({
      userId: ctx.userId,
      houseId: params.id,
      // 未支付
      isPay: 0,
      createTime: ctx.helper.formatTime()
    });
    if (result) {
      this.success({
        ...result.dataValues,
        isSuccess: true
      })
    } else {
      this.success("添加订单失败")
    }
  }
  // 取消订单, 根据订单id删除
  async delOrder() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const result = await ctx.service.orders.delOrder(id)
    if (result) {
      this.success({
        ...result,
        isSuccess: true
      })
    } else {
      this.error("取消订单失败")
    }
  }

  // 获取订单列表
  async orderList() {
    const { ctx } = this;
    // 需要分为已支付和未支付，所以需要传递isPay作为约束。前端两个路由
    const params = ctx.request.body;
    // console.log("ctx.request.body", ctx.request.body)
    const result = await ctx.service.orders.orderList({
      userId: ctx.userId,
      ...params
    })
    if (result) {
      this.success(result)
    } else {
      this.error("暂无数据")
    }
  }

  async invokePay(params) {
    return {
      orderNumber: params.id + new Date().getTime()
    }
  }

  // 支付接口
  async pay() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const order = await ctx.model.Orders.findByPk(id);
    if (order) {
      const beforePsy = await this.invokePay({ id });
      const result = await ctx.service.orders.pay({
        id,
        // 订单号
        orderNumber: beforePsy.orderNumber,
        // 更新订单时间
        updateTime: ctx.helper.formatTime()
      })
      if (result) {
        this.success({
          ...result,
          isSuccess: true
        })
      } else {
        this.error("支付订单失败")
      }
    } else {
      this.error("订单不存在")
    }
  }
}




module.exports = OrdersController