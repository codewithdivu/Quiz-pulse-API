import express from "express";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../controllers/authController.js";
import authenticateMiddleware from "../middlewares/authenticateMiddleware.js";

const AuthRouter = express.Router();

AuthRouter.route("/register").post(register);
AuthRouter.route("/login").post(login);
AuthRouter.route("/reset-password").post(resetPassword);
AuthRouter.route("/forgot-password").post(forgotPassword);

export default AuthRouter;
