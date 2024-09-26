const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const authMiddleware = require("../middlewares/authMiddleware");

// Mock database (replace with real DB in production)
const users = [
  {
    id: 1,
    username: "john",
    password: "$2b$10$f3tKwgQOHLJOe7WMMpmkE.ge7UH5vTAzn8Ouqu/0C.8U0XkJ2TLD6",
  }, // Password is "password123"
];

/* Please note that below is a POST request */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res
      .status(400)
      .json({ message: `user '${username}' not found in the database!` });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Incorrect password!" });
  }

  req.session.userId = user.id;
  res.json({ message: "User logged in successfully!" });
});

router.get("/check-session", (req, res) => {
  if (req.session.userId) {
    res.json({
      message: "User is currently logged in!",
      userId: req.session.userId,
    });
  } else {
    res.status(401).json({ message: "User is not logged in!" });
  }
});

/* Please note that we have made our 'logout' as a protected route,
 *  i.e., only authenticated users are allowed to use it
 */
router.get("/logout", authMiddleware, (req, res) => {
  // req.session.destroy() handles session removal on the server side
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "Error logging out!" });
    }
    // res.clearCookie() ensures that the client-side cookie is also cleared (complete cleanup of stale cookies)
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully!" });
  });
});

/*
Creating hash password

    async function hashPassword() {
      const password = "password123";
      const saltRounds = 10; // Adjust the salt rounds as needed
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log("Hashed password:", hashedPassword);
    }
*/

module.exports = router;
