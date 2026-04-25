import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const router = Router();

router
  .post("/", ProductController.create)
  .get("/", ProductController.getAll)
  .get("/", ProductController.getProductFromCategory);

export default router;
