import express from "express";
import { getAllUsers } from "../controllers/userController";

const UserRouter = express.Router();

UserRouter.route("list").get(getAllUsers);

export default UserRouter;
