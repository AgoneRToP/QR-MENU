import { Router } from "express";
import FeedbackController from "../controllers/feedback.controller.js";

const feedbackRouter = Router();

feedbackRouter
  .post("/", FeedbackController.create)
  .get("/", FeedbackController.getAll);

export default feedbackRouter;
