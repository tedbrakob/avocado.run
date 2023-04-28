const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: import.meta.env.VITE_API_URL,
      changeOrigin: true,
    })
  );
};