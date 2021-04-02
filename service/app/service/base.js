const { Service } = require("egg");

class BaseService extends Service {
  async run(callback) {
    const { ctx, app } = this;
    try {
      if (callback) {
        return callback(ctx, app);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = BaseService