import { User } from "../models/user.model.js";

class AuthController {
  #_userModel;
  constructor() {
    this.#_userModel = User;
  }

  register = async (req, res) => {};

  login = async (req, res) => {};

  refresh = async (req, res) => {};
}

export default AuthController;
