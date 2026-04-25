import { Category } from "../models/category.model.js";
import { BadRequestException } from "../exceptions/bad-request.exception.js"; // 400
import { ConflictException } from "../exceptions/conflict.exception.js"; // 409

class CategoryController {
  #_categoryModel;
  constructor() {
    this.#_categoryModel = Category;
  }

  create = async (req, res, next) => {
    try {
      const { name } = req.body;
      const user_id = req.user?.id;

      if (!name || !user_id)
        throw new BadRequestException("All fields are required");

      const existing = await this.#_categoryModel.findOne({ name });

      if (existing) {
        throw new ConflictException("Category already exists");
      }

      const category = await this.#_categoryModel.create({
        name,
        user_id,
      });

      res.status(201).json(category);
    } catch (error) {
      next(error)
    }
  };

  getAll = async (req, res, next) => {
    try {
      const categories = await this.#_categoryModel
        .find()
        .populate("user_id", "name email");

      res.json(categories);
    } catch (error) {
      next(error)
    }
  };
}

export default new CategoryController();
