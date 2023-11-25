import express from "express";
import { register } from "../controllers/userController.js";

const UserRouter = express.Router();

UserRouter.post("/register", register);

export default UserRouter;
