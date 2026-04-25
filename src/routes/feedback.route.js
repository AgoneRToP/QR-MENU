import { Router } from "express";
import FeedbackController from "../controllers/feedback.controller.js";

const router = Router();

router
  .post("/", FeedbackController.create)
  .get("/", FeedbackController.getAll);

export default router;
