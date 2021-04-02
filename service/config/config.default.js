/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1616233609974_4905';

  // add your middleware config here
  config.middleware = [];

  // 设置session选项
  config.session = {
    key: 'ZH_LLM',
    httpOnly: true,
    renew: true
  }

  // 配置自定义中间件,这里出现的路由是不需要用户登录验证的。
  config.auth = {
    exclude: ["/api/user/login", "/api/user/register"]
  }

  // 限制请求配置的参数
  config.interfaceLimit = {
    maxCount: 3,
    // 设置请求时间
    time: 3000
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    salt: 'zhllm'
  };

  // 通过sequelize来操作mysql数据库
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    user: "root",
    password: "ZH123456",
    database: 'egg_house',
    define: {
      timestamps: false,
      freezeTableName: true//使用原始表名称。
    }
  };

  // 配置mysql数据库
  // exports.mysql = {
  //   // 单数据库信息配置
  //   client: {
  //     // host
  //     host: '127.0.0.1',
  //     // 端口号
  //     port: '3306',
  //     // 用户名
  //     user: 'root',
  //     // 密码
  //     password: 'ZH123456',
  //     // 数据库名
  //     database: 'egg_house',
  //   },
  //   // 是否加载到 app 上，默认开启
  //   app: true,
  //   // 是否加载到 agent 上，默认关闭
  //   agent: false,
  // };

  // 解决跨域
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['http://127.0.0.1:3000', 'http://127.0.0.1:8080']
  };
  config.cors = {
    credentials: true,   // 开启认证
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
  };

  // 这个挂载到app上。
  config.jwt = {
    secret: 'zhllm',//设置秘钥
  }

  return {
    ...config,
    ...userConfig,
  };
};
