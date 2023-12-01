import {
  createQuestion,
  getQuestion,
  deleteQuestion,
  updateQuestion,
  getAllQuestion,
} from "../controllers/questionController.js";
import express from "express";
import authenticateMiddleware from "../middlewares/authenticateMiddleware.js";

const QuestionRouter = express.Router();

QuestionRouter.route("/").get(authenticateMiddleware, getAllQuestion);
QuestionRouter.route("/create").post(authenticateMiddleware, createQuestion);
QuestionRouter.route("/:id")
  .get(authenticateMiddleware, getQuestion)
  .patch(authenticateMiddleware, updateQuestion)
  .delete(authenticateMiddleware, deleteQuestion);

export default QuestionRouter;
