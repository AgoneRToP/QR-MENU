import { Router } from "express";
import authRouter from "./auth.route.js";
import categoryRouter from "./category.route.js";
import productRouter from "./product.route.js";
import feedbackRouter from "./feedback.route.js";

const apiRouter = Router();

apiRouter
  .use("/auth", authRouter)
  .use("/categories", categoryRouter)
  .use("/products", productRouter)
  .use("/feedback", feedbackRouter);

export default apiRouter;
