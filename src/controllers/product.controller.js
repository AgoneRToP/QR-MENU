import { Product } from "../models/product.model.js";
import { BadRequestException } from "../exceptions/bad-request.exception.js"; // 400
import { NotFoundException } from "../exceptions/not-found.exception.js"; // 404

class ProductController {
  #_productModel;
  constructor() {
    this.#_productModel = Product;
  }

  create = async (req, res, next) => {
    try {
      const { name, price, category_id, image } = req.body;

      if (!name || !price || !category_id || !image)
        throw new BadRequestException("All fields are required");

      const product = await this.#_productModel.create({
        name,
        price,
        category_id,
        image,
      });

      res.status(201).json(product);
    } catch (error) {
      next(error)
    }
  };

  getAll = async (req, res, next) => {
    try {
      const products = await this.#_productModel.findAll();

      res.json(products);
    } catch (error) {
      next(error)
    }
  };

  getProductFromCategory = async (req, res, next) => {
    try {
      const { category_id } = req.params;

      const products = await this.#_productModel.findAll({
        where: { category_id },
      });

      if (!products.length) 
        throw new NotFoundException("No product found");

      res.json(products);
    } catch (error) {
      next(error)
    }
  };
}

export default new ProductController();
