// Models
import { User } from "../models/user.model.js";
// Dependencies
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "winston";
// Configs
import jwtConfig from "../configs/jwt.config.js";
import signature from "../configs/signed.config.js";
// Exceptions
import { BadRequestException } from "../exceptions/bad-request.exception.js"; // 400
import { NotFoundException } from "../exceptions/not-found.exception.js"; // 404
import { ConflictException } from "../exceptions/conflict.exception.js"; // 409

// config();

class AuthController {
  #_userModel;
  constructor() {
    this.#_userModel = User;
  }

  register = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await this.#_userModel.findOne({ email });
      if (existingUser) throw new ConflictException("Email already taken");

      const hashedPass = await this.#_hashPassword(password);

      const newUser = await this.#_userModel.create({
        name,
        email,
        password: hashedPass,
        role: "USER",
      });

      const accessToken = this.#_generateAccessToken({
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      });

      res.send({
        success: true,
        data: newUser,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const existingUser = await this.#_userModel.findOne({ email });
      if (!existingUser) throw new NotFoundException("User not found");

      const isPassSame = await this.#_comparePass(
        password,
        existingUser.password
      );

      if (!isPassSame) {
        throw new ConflictException("Invalid password");
      }

      const accessToken = this.#_generateAccessToken({
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      });

      const refreshToken = this.#_generateRefreshToken({
        id: existingUser._id,
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        signed: true,
        maxAge: 15 * 60 * 1000, // 15 минут
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        signed: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
      });

      res.send({
        success: true,
        data: existingUser,
      });
    } catch (error) {
      next(error);
    }
  };

  refresh = async (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) throw new BadRequestException("Token not given");

      const payload = jwt.verify(
        refreshToken,
        jwtConfig.REFRESH_TOKEN_SECRET_KEY,
      );

      const accessToken = this.#_generateAccessToken({ id: payload.id });
      res.send({
        success: true,
        data: {
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  #_hashPassword = async (pass) => {
    const hashedPass = await hash(pass, 20);

    return hashedPass;
  };

  #_comparePass = async (originalPass, hashedPass) => {
    const isSame = await compare(originalPass, hashedPass);

    return isSame;
  };

  #_generateAccessToken = (payload) => {
    const token = jwt.sign(payload, jwtConfig.SECRET_KEY, {
      algorithm: "HS256",
      expiresIn: jwtConfig.EXPIRE_TIME,
    });

    return token;
  };

  #_generateRefreshToken = (payload) => {
    const token = jwt.sign(payload, jwtConfig.REFRESH_TOKEN_SECRET_KEY, {
      algorithm: "HS256",
      expiresIn: jwtConfig.REFRESH_TOKEN_EXPIRE_TIME,
    });

    return token;
  };
}

export default new AuthController();
