const logger = require("../logger");

module.exports = function (req, res, next) {
  logger.info(`${req.method} ${req.url}`, {
    method: req.method,
    url: req.url,
    params: req.params,
    query: req.query,
    body: req.body,
  });
  next();
};
