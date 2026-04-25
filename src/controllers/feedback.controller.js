import { Feedback } from "../models/feedback.model.js";
import { BadRequestException } from "../exceptions/bad-request.exception.js"; // 400

class FeedbackController {
  #_feedbackModel;
  constructor() {
    this.#_feedbackModel = Feedback;
  }

  create = async (req, res, next) => {
    try {
      const { message, type, image, product_id } = req.body;
      const user_id = req.user?.id;

      if (!message || !product_id)
        throw new BadRequestException("message and product_id are required");

      const feedback = await this.#_feedbackModel.create({
        message,
        type,
        image,
        product_id,
        user_id,
      });

      res.status(201).send({
        success: true,
        data: feedback,
      });
    } catch (error) {
      next(error);
    }
  };

  // 📦 получить все отзывы
  getAll = async (req, res, next) => {
    try {
      const feedbacks = await this.#_feedbackModel
        .find()
        .populate("user_id", "name email")
        .populate("product_id", "name price");

      res.send({
        success: true,
        data: feedbacks,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new FeedbackController();
