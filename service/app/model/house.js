'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const House = app.model.define('house', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(50),
    info: STRING(150),
    addres: STRING(200),
    price: INTEGER,
    publishTime: {
      type: DATE,
      get() {
        return new Date(this.getDataValue("publishTime")).getTime()
      }
    },
    cityCode: STRING(10),
    showCount: INTEGER,
    startTime: {
      type: DATE,
      // 将字段返回为时间戳
      get() {
        return new Date(this.getDataValue("startTime")).getTime()
      }
    },
    endTime: {
      type: DATE,
      get() {
        return new Date(this.getDataValue("endTime")).getTime()
      }
    },
  });

  // 关联Imgs表，通过houseId
  House.associate = () => {
    app.model.House.hasMany(app.model.Imgs, { foreignKey: "houseId" });
  }

  return House;
};