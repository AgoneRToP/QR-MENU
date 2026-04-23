import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const productRouter = Router();

productRouter
  .post("/", ProductController.create)
  .get("/", ProductController.getAll)
  .get("/", ProductController.getProductFromCategory);

export default productRouter;
