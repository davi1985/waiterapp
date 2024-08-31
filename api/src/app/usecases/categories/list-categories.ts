import { Request, Response } from "express";
import { Category } from "../../../models/Category";

export const listCategories = async (_: Request, res: Response) => {
  const categories = await Category.find();

  res.json(categories);
};
