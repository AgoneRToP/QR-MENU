import { Router } from "express";
import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { Feedback } from "../models/feedback.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const categories = await Category.find();
  const products = await Product.find().populate("category_id").limit(8);

  const feedbacks = await Feedback.find().populate("product_id").limit(5);

  res.render("home", {
    cssFile: "style",
    categories,
    products,
    feedbacks,
  });
});

export default router;
