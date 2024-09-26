const express = require("express");
const session = require("express-session");

const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

const authMiddleware = require("./middlewares/authMiddleware");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const PORT = process.env.port || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

/*
1. Basic routes

    app.get("/", (req, res) => {
    res.send("Hello from Node.js server!");
    });

    app.get("/api/hello", (req, res) => {
    setTimeout(() => res.json({ message: "Hello from the Node.js API!" }), 500);
    });
*/

/*
2. Persisting a session across page reloads

    app.get("/api/session", (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.json({ message: `Your session number ${req.session.views}` });
    } else {
        req.session.views = 1;
        res.json({ message: "welcome to your first session!" });
    }
    });
*/

// Public routes (no authentication required)
app.use("/api/users", userRoutes);

// Apply authMiddleware globally to protect all other routes
app.use(authMiddleware);

// Protected routes
app.use("/api/products", productRoutes);

// Error Handling Middleware (triggered in product.js - router.get("/:id")
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
