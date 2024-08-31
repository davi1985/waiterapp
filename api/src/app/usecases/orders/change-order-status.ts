import { Request, Response } from "express";
import { Order } from "../../../models/Order";

const STATUS = ["WAITING", "IN_PRODUCTION", "DONE"];
export const changeOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["WAITING", "IN_PRODUCTION", "DONE"].includes(status)) {
      return res.status(400).json({
        error: "Status should be one of these: WAITING, IN_PRODUCTION or DONE",
      });
    }

    await Order.findByIdAndUpdate(orderId, { status });

    res.sendStatus(204);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
};
