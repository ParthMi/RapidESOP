const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/company/register',
    createProxyMiddleware({
      target: 'http://192.168.1.3:8093',
      changeOrigin: true,
    })
  );
};
