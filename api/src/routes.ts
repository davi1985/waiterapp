import path from "node:path";

import { Router } from "express";
import multer from "multer";

import { listCategories } from "./app/usecases/categories/list-categories";
import { createCategory } from "./app/usecases/categories/create-category";
import { listProducts } from "./app/usecases/products/list-products";
import { createProduct } from "./app/usecases/products/create-product";
import { listProductsByCategory } from "./app/usecases/categories/list-products-by-category";
import { listOrders } from "./app/usecases/orders/list-orders";
import { cancelOrder } from "./app/usecases/orders/cancel-order";
import { createOrder } from "./app/usecases/orders/create-order";

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
router.get("/categories/:categoryId/products", listProductsByCategory);

router.get("/products", listProducts);
router.post("/products", upload.single("image"), createProduct);

router.get("/orders", listOrders);
router.post("/orders", createOrder);

// Change order status
router.patch("/orders/:orderId", (req, res) => {
  res.send("change order status");
});

// Delete/Cancel order
router.delete("/orders/:orderId", (req, res) => {
  res.send("cancel order");
});
