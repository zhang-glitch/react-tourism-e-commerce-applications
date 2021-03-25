const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',//跨域的根路径
    createProxyMiddleware({
      target: 'http://127.0.0.1:7001',//跨域的地址
      changeOrigin: true,
    })
  );
};