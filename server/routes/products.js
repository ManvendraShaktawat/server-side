const express = require("express");
const router = express.Router();

// Mock product database (replace with a real database in a production app)
const products = [
  { id: 1, name: "Laptop", price: 999, description: "High-performance laptop" },
  {
    id: 2,
    name: "Smartphone",
    price: 499,
    description: "Latest model smartphone",
  },
  {
    id: 3,
    name: "Headphones",
    price: 199,
    description: "Noise-cancelling headphones",
  },
];

// Get all products
router.get("/", (req, res, next) => {
  res.json({ products });
});

// Get a single product by ID
router.get("/:id", (req, res, next) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === productId);
  if (!product) {
    // If product is not found, create an error and pass it to the error-handling middleware
    const error = new Error("Product not found!");
    error.status = 404;
    return next(error);
  }
  res.json(product);
});

// Create a new product (Protected route)
router.post("/", (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    description,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update an existing product (Protected route)
router.put("/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const { name, price, description } = req.body;
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    const updatedProduct = {
      id: productId,
      name,
      price,
      description,
    };
    products[productIndex] = updatedProduct;
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Delete a product (Protected route)
router.delete("/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

module.exports = router;
