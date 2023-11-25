import express from "express";
import {
  getAllUsers,
  getUserByID,
  updateProfile,
} from "../controllers/userController.js";

const UserRouter = express.Router();

UserRouter.route("/").get(getAllUsers);
UserRouter.route("/:id").get(getUserByID);
UserRouter.route("/:id/updateProfile").patch(updateProfile);

export default UserRouter;
