import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter
  .post("/register", AuthController.register)
  .post("/login", AuthController.login)
  .post("/refresh", AuthController.refresh);

export default authRouter;
