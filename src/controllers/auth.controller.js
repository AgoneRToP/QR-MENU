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

  register = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await this.#_userModel.findOne({ email });

    if (existingUser) {
      throw new ConflictException("Email already taken");
    }

    const hashedPass = await this.#_hashPassword(password);

    const newUser = await this.#_userModel.insertOne({
      name,
      email,
      password: hashedPass,
      role: `USER`,
    });

    const token = this.#_generateAccessToken({
      email: newUser.email,
      role: newUser.role,
    });

    res.send({
      success: true,
      data: newUser,
      token,
    });
  };

  login = async (req, res) => {
    const { email, password } = req.body;

    console.log(req.cookies, "cookies");
    console.log(req.signedCookie, "signed cookies");

    const existingUser = await this.#_userModel.findOne({ email });

    if (!existingUser) {
      throw new NotFoundException("User not found");
    }

    const isPassSame = await this.#_comparePass(
      password,
      existingUser.password,
    );

    if (!isPassSame) {
      throw new ConflictException("Given password is invalid");
    }

    // token generation

    const accessToken = this.#_generateAccessToken({
      email: existingUser.email,
      role: existingUser.role,
    });

    const refreshToken = this.#_generateRefreshToken({
      username: existingUser.username,
    });

    res.cookie("token", token, {
      signed: true,
      expires: new Date(Date.now() + 5_000),
      // expires: "1h",
    });

    res.cookie("refreshToken", refreshToken, {
      signed: true,
      expires: new Date(Date.now() + 5_000),
      // expires: "7d",
    });

    res.send({
      success: true,
      data: existingUser,
      accessToken,
      refreshToken,
    });
  };

  refresh = async (req, res) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new BadRequestException("Token not given");
      }

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
