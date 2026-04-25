import { Router } from "express";
import { Feedback } from "../models/feedback.model.js";
import { Product } from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const feedbacks = await Feedback.find()
    .populate("product_id")
    .populate("user_id");

  const products = await Product.find();

  res.render("feedback", {
    cssFile: "style",
    feedbacks,
    products,
  });
});

export default router;