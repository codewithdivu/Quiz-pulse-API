import express from "express";
import {
  getAllUsers,
  getUserByID,
  updateProfile,
  uploadProfilePic,
} from "../controllers/userController.js";
import authenticateMiddleware from "../middlewares/authenticateMiddleware.js";
import multer from "multer";

const UserRouter = express.Router();

const upload = multer();

UserRouter.route("/").get(authenticateMiddleware, getAllUsers);
UserRouter.route("/:id").get(authenticateMiddleware, getUserByID);
UserRouter.route("/:id/updateProfile").patch(
  authenticateMiddleware,
  updateProfile
);
UserRouter.route("/profilePic").post(upload.single("profilePic"), uploadProfilePic);

export default UserRouter;
