import { Product } from "../models/product.model.js";

class ProductController {
  #_productModel;
  constructor() {
    this.#_productModel = Product;
  }

  create = async (req, res) => {};

  getAll = async (req, res) => {};

  getProductFromCategory = async (req, res) => {};
}

export default new ProductController();
