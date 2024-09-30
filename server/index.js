const express = require("express");
const session = require("express-session");

const SSR = require("./SSR");

const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

// const authMiddleware = require("./middlewares/authMiddleware"); - deprecated
const jwtAuthMiddleware = require("./middlewares/jwtAuthMiddleware");
const requestLogger = require("./middlewares/requestLogger");
const errorHandler = require("./middlewares/errorHandler");

const rateLimit = require("express-rate-limit");

const app = express();

// Trust the first proxy to avoid ValidationError of 'X-Forwarded-For' header
app.set("trust proxy", 1);

const PORT = process.env.port || 3000;

/* ----------------------------------- SSR ------------------------------------ */

// Use SSR handler for root route '/'
app.use("^/$", SSR);

// Serve static assets
app.use(express.static("./build"));

/* ----------------------------------- SSR ------------------------------------ */

// Global middleware to parse JSON bodies (received via JSON stringified request body)
app.use(express.json());

// Deprecated session-based authentication
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Create a rate limiter
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

// Apply the rate limiter to all requests
app.use(rateLimiter);

app.get("/", (req, res) => {
  res.send("Hello from Node.js server!");
});

/* ------------------------ Custom routes and middlewares ------------------------ */

// Log all the requests using Winston
app.use(requestLogger);

// Public routes (no authentication required)
app.use("/api/users", userRoutes);

// Apply authMiddleware globally to protect all other routes
// app.use(authMiddleware); Basic auth using express session
app.use(jwtAuthMiddleware);

// Protected routes
app.use("/api/products", productRoutes);

// Error Handling Middleware (triggered in product.js - router.get("/:id")
app.use(errorHandler);

/* ------------------------ Custom routes and middlewares ------------------------ */

app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
