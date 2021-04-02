'use strict';

const BaseService = require("./base")

class HouseService extends BaseService {

  getOptions(app) {
    return {
      order: [
        ["showCount", "DESC"]
      ],
      // 删除不需要返回的字段
      attributes: {
        exclude: ['startTime', 'endTime', 'publishTime']
      },
      include: [
        {
          model: app.model.Imgs,
          limit: 1,
          attributes: ['url']
        }
      ]
    }
  }
  // 获取房屋信息
  async getHouse() {
    return this.run(async (ctx, app) => {
      const res = await ctx.model.House.findAll({
        limit: 4,
        ...this.getOptions(app)
      })
      return res;
    })
  }


  // 获取搜索数据
  async getSearch(params) {
    return this.run(async (ctx, app) => {
      const { lte, gte, like } = app.Sequelize.Op;
      let cityCode;
      if (Array.isArray(params.code)) {
        cityCode = params.code[0]
      } else {
        cityCode = params.code
      }

      const where = {
        cityCode,
        startTime: {
          // 小于
          [lte]: params.startTime
        },
        endTime: {
          // 大于
          [gte]: params.endTime
        },
        // 模糊查询
        name: {
          [like]: "%" + params.houseName + "%"
        }
      }

      // 可能没有使用模糊查询
      if (!params.houseName) {
        Reflect.deleteProperty(where, "name")
        // delete where.name
      }
      const res = await ctx.model.House.findAll({
        limit: 8,
        offset: (params.pageNum - 1) * params.pageSize,
        ...this.getOptions(app),
        where
      })
      return res
    })
  }

  // 获取民宿详情数据
  async getDetail(id) {
    return this.run(async (ctx, app) => {
      const res = await ctx.model.House.findOne({
        where: {
          id
        },
        include: [
          {
            model: app.model.Imgs,
            attributes: ['url']
          }
        ]
      })

      // 每次访问都增加showCount的值。
      await ctx.model.House.update(
        {
          showCount: res.showCount + 1
        },
        {
          where: { id }
        })
      return res
    })
  }

}

module.exports = HouseService