'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/detail', controller.user.getDetail);
  router.post('/api/user/logout', controller.user.logout);
  router.post('/api/user/edit', controller.user.edit);
  // 请求热门城市数据
  router.post('/api/house/hot', controller.house.hot);
  // 请求查询接口
  router.post('/api/house/search', controller.house.search);
  router.post('/api/house/detail', controller.house.detail);

  // 评论接口
  router.post('/api/comment/add', controller.comment.add);
  // 获取评论接口
  router.post('/api/comment/lists', controller.comment.lists);

  // 判断订单接口
  router.post('/api/orders/hasOrder', controller.orders.hasOrder);
  router.post('/api/orders/addOrder', controller.orders.addOrder);
  router.post('/api/orders/delOrder', controller.orders.delOrder);
  router.post('/api/orders/orderList', controller.orders.orderList);
  // 模拟支付
  router.post('/api/orders/pay', controller.orders.pay);
};
