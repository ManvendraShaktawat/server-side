/**
 * We can apply this authMiddleware in 2 ways:
 * 1. Specifically to a route (app.get, app.post, etc.)
 * 2. Globally (app.use)
 *
 * If we want to apply authMiddleware globally except certain routes (like login/signup),
 * then we can define such routes before applying this middleware (i.e. before app.use())
 */

module.exports = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorised access" });
  }
};
