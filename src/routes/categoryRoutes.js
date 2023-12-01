import express from "express";
import {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getALLCategories,
} from "../controllers/categoryController.js";
import authenticateMiddleware from "../middlewares/authenticateMiddleware.js";

const CategoryRouter = express.Router();

CategoryRouter.route("/").get(authenticateMiddleware, getALLCategories);
CategoryRouter.route("/create").post(authenticateMiddleware, createCategory);
CategoryRouter.route("/:id")
  .patch(authenticateMiddleware, updateCategory)
  .get(authenticateMiddleware, getCategory)
  .delete(authenticateMiddleware, deleteCategory);

export default CategoryRouter;
