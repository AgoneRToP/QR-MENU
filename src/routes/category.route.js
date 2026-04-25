import { Router } from "express";
import CategoryController from "../controllers/category.controller.js";

const router = Router();

router
  .post("/", CategoryController.create)
  .get("/", CategoryController.getAll);

export default router;
