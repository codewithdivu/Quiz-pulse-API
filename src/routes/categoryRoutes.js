import express from "express";
import {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getALLCategories,
} from "../controllers/categoryController.js";

const CategoryRouter = express.Router();

CategoryRouter.route("/").get(getALLCategories);
CategoryRouter.route("/create").post(createCategory);
CategoryRouter.route("/:id")
  .patch(updateCategory)
  .get(getCategory)
  .delete(deleteCategory);

export default CategoryRouter;
