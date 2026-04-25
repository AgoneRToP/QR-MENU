import { Router } from "express";
import { Category } from "../models/category.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });

  res.render("category", {
    cssFile: "style",
    categories,
  });
});

export default router;
