const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["authorisation"];
  if (!token || token === "null") {
    return res.status(401).json({ message: "Please login first!" });
  }

  try {
    const decoded = jwt.verify(token, "secret key");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token!" });
  }
};
