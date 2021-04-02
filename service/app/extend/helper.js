const dayjs = require("dayjs")

module.exports = {

  // this 是 helper 对象，在其中可以调用其他 helper 方法
  // this.ctx => context 对象
  // this.app => application 对象


  // 返回格式化时间
  formatTime() {
    return dayjs().format("YYYY-MM-DD HH:mm:ss");
  },

  // 将时间转化为时间戳
  timestamp(time) {
    return new Date(time).getTime();
  },

  // 删除数组中指定属性
  unPick(source, arr) {
    if (Array.isArray(arr)) {
      let obj = {};
      for (let key in source) {
        if (!arr.includes(key)) {
          obj[key] = source[key]
        }
      }
      return obj;
    }
  }
};