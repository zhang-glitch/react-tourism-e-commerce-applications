


const BaseController = require("./base");

class HouseController extends BaseController {

  // 热门城市接口
  async hot() {
    const { ctx } = this;
    const result = await ctx.service.house.getHouse();
    if (result) {
      this.success(result)
    } else {
      this.error("暂无数据")
    }
  }

  // 查询接口
  async search() {
    const { ctx } = this;
    const params = ctx.request.body;
    const result = await ctx.service.house.getSearch(params);
    if (result) {
      this.success(result)
    } else {
      this.error("查无数据")
    }
  }


  // 民宿详情
  async detail() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const result = await ctx.service.house.getDetail(id);

    if (result) {
      this.success(result)
    } else {
      this.error("查无数据")
    }
  }
}


module.exports = HouseController