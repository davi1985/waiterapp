import { Request, Response } from "express";
import { Order } from "../../../models/Order";
import { io } from "../../..";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { table, products } = req.body;

    const order = await Order.create({ table, products });

    const orderDetails = await order.populate("products.product");

    io.emit("orders@new", orderDetails);
    res.status(201).json(order);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
};
