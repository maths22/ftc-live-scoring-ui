const proxy = require('http-proxy-middleware');
const packageJson = require('../package.json');

module.exports = function expressMiddleware(router) {
  const domain = packageJson.proxy || {};
  router.use("/api", proxy({
    target: domain
  }))
}