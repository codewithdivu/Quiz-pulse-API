import express from "express";
import {
  createQuiz,
  getAllQuiz,
  getQuiz,
  deleteQuiz,
  updateQuiz,
} from "../controllers/quizController.js";
import authenticateMiddleware from "../middlewares/authenticateMiddleware.js";

const QuizRouter = express.Router();

QuizRouter.route("/").get(authenticateMiddleware, getAllQuiz);
QuizRouter.route("/create").post(authenticateMiddleware, createQuiz);
QuizRouter.route("/:id")
  .get(authenticateMiddleware, getQuiz)
  .patch(authenticateMiddleware, updateQuiz)
  .delete(authenticateMiddleware, deleteQuiz);

export default QuizRouter;
