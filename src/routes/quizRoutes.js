import express from "express";
import {
  createQuiz,
  getAllQuiz,
  getQuiz,
  deleteQuiz,
  updateQuiz,
} from "../controllers/quizController.js";

const QuizRouter = express.Router();

QuizRouter.route("/").get(getAllQuiz);
QuizRouter.route("/create").post(createQuiz);
QuizRouter.route("/:id").get(getQuiz).patch(updateQuiz).delete(deleteQuiz);

export default QuizRouter;
