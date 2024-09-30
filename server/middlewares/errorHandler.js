/**
 * Error handling middlewares have 4 arguments as compared to regular middlewares which have 3
 * For an errorHandler middleware to get triggered,
 * 'next' needs to be called with an argument, i.e. next(err)
 */

const logger = require("../logger");

module.exports = function (err, req, res, next) {
  //winston logger
  logger.error(err.message, { metadata: err });
  res.status(err.status || 500).json({
    error: { message: err.message || "Internal server error" },
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};
