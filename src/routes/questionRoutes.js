import {
  createQuestion,
  getQuestion,
  deleteQuestion,
  updateQuestion,
  getAllQuestion,
} from "../controllers/questionController.js";
import express from "express";

const QuestionRouter = express.Router();

QuestionRouter.route("/").get(getAllQuestion);
QuestionRouter.route("/create").post(createQuestion);
QuestionRouter.route("/:id")
  .get(getQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion);

export default QuestionRouter;
