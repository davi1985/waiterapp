import { Request, Response } from "express";
import { Order } from "../../../models/Order";

export const listOrders = async (_: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .sort({
        createdAt: 1,
      })
      .populate("products.product");

    res.json(orders);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
};
