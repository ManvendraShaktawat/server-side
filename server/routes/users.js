const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtAuthMiddleware = require("../middlewares/jwtAuthMiddleware");

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

  // req.session.userId = user.id; - deprecated
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    "secret key",
    {
      expiresIn: "1h",
    }
  );
  res.json({ token, message: "Login successful!" });
});

/*
Deprecated check-session handling, where server-side session was maintained

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
*/

/* New handling with stateless JWT */
router.get("/check-session", jwtAuthMiddleware, (req, res) => {
  res.json({
    message: "User is currently logged in!",
    user: req.user,
  });
});

/*
Deprecated logout handling, where server-side session was maintained

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "Error logging out!" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully!" });
  });
});
*/

/* New handling with stateless JWT */
router.post("/logout", (req, res) => {
  // Since we're stateless, we don't need to destroy a session.
  // If token blacklisting is implemented, you would add the token to the blacklist here.

  res.json({ message: "Logged out successfully!" });
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
