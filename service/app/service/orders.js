'use strict';
const BaseService = require("./base")

class OrdersService extends BaseService {

  // 根据userId, houseId来获取订单
  async hasOrder(userId, params) {
    return this.run(async (ctx) => {
      const res = await ctx.model.Orders.findOne({
        where: {
          userId,
          houseId: params.id
        }
      })
      return res
    })
  }

  // 添加订单
  async addOrder(params) {
    return this.run(async (ctx) => {
      const res = await ctx.model.Orders.create(params)
      return res
    })
  }

  // 取消订单
  async delOrder(id) {
    return this.run(async (ctx) => {
      const res = await ctx.model.Orders.destroy({
        where: {
          id
        }
      })
      // 返回删除的条数。
      return res
    })
  }

  async orderList(params) {
    return this.run(async (ctx, app) => {
      const res = await ctx.model.Orders.findAll({
        where: {
          userId: params.userId,
          isPayed: params.isPay
        },
        limit: params.pageSize,
        offset: (params.pageNum - 1) * params.pageSize,
        include: [
          {
            model: app.model.House,
            as: "house",
            include: {
              model: app.model.Imgs,
              attributes: ["url"],
              limit: 1
            }
          }
        ]
      })
      return res
    })
  }

  async pay(params) {
    return this.run(async (ctx, app) => {
      const res = await ctx.model.Orders.update({
        isPayed: 1,
        orderNumber: params.orderNumber,
        updateTime: params.updateTime
      }, {
        where: {
          id: params.id
        }
      })
      return res
    })
  }
}

module.exports = OrdersService