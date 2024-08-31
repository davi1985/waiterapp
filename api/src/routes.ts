import path from "node:path";

import { Router } from "express";
import multer from "multer";

import { listCategories } from "./app/usecases/categories/list-categories";
import { createCategory } from "./app/usecases/categories/create-category";
import { listProducts } from "./app/usecases/products/list-products";
import { createProduct } from "./app/usecases/products/create-product";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(_, __, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(_, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

router.get("/categories", listCategories);
router.post("/categories", createCategory);

router.get("/products", listProducts);
router.post("/products", upload.single("image"), createProduct);

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
