import { Router } from "express";
import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await Product.find().populate("category_id");
  const categories = await Category.find();

  res.render("product", {
    cssFile: "style",
    products,
    categories,
  });
});

export default router;