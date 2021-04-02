'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // mysql: {
  //   enable: true,
  //   package: 'egg-mysql'
  // }
  cors: {
    enable: true,
    package: 'egg-cors'
  },

  jwt: {
    enable: true,
    package: 'egg-jwt'
  }
};
