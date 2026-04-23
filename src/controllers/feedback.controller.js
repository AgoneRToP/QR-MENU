import { Feedback } from "../models/feedback.model.js";

class FeedbackController {
  #_feedbackModel;
  constructor() {
    this.#_feedbackModel = Feedback;
  }

  create = async (req, res) => {};

  getAll = async (req, res) => {};
}

export default FeedbackController;
