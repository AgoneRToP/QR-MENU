import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { ValidationMiddleware } from "../middlewares/validation.middlewar.js";
import { RegisterSchema } from "../schemas/auth/register.schema.js";
import { LoginSchema } from "../schemas/auth/login.schema.js";

const authRouter = Router();

authRouter
  .post("/register", ValidationMiddleware(RegisterSchema), AuthController.register)
  .post("/login", ValidationMiddleware(LoginSchema), AuthController.login)
  .post("/refresh", AuthController.refresh);

export default authRouter;
