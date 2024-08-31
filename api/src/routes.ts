import { Router } from "express";

export const router = Router();

// List categories
router.get("/categories", (req, res) => {
  res.send("all categories");
});

// Create category
router.post("/categories", (req, res) => {
  res.send("save categories");
});

// List products
router.get("/products", (req, res) => {
  res.send("all products");
});

// Create products
router.post("/products", (req, res) => {
  res.send("save products");
});

// Get products by category
router.get("/categories/:categoryId/products", (req, res) => {
  res.send("products by category");
});

// List orders
router.get("/orders", (req, res) => {
  res.send("all orders");
});

// Create order
router.post("/orders", (req, res) => {
  res.send("save categories");
});

// Change order status
router.patch("/orders/:orderId", (req, res) => {
  res.send("change order status");
});

// Delete/Cancel order
router.delete("/orders/:orderId", (req, res) => {
  res.send("cancel order");
});
