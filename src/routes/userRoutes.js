import express from "express";
import {
  getAllUsers,
  getUserByID,
  updateProfile,
} from "../controllers/userController.js";
import authenticateMiddleware from "../middlewares/authenticateMiddleware.js";

const UserRouter = express.Router();

UserRouter.route("/").get(authenticateMiddleware, getAllUsers);
UserRouter.route("/:id").get(authenticateMiddleware, getUserByID);
UserRouter.route("/:id/updateProfile").patch(
  authenticateMiddleware,
  updateProfile
);

export default UserRouter;
