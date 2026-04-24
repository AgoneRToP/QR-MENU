import { Category } from "../models/category.model.js";

class CategoryController {
  #_categoryModel;
  constructor() {
    this.#_categoryModel = Category;
  }

  create = async (req, res) => {};

  getAll = async (req, res) => {};
}

export default new CategoryController();
