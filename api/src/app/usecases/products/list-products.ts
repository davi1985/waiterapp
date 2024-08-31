import { Request, Response } from "express";
import { Product } from "../../../models/Product";

export const listProducts = async (_: Request, res: Response) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
};
