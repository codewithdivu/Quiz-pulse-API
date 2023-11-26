import express from "express";
import { submitQuestionResponse } from "../controllers/TemporaryQuestionResponseController.js";

const TemporaryQuestionResponseRouter = express.Router();

TemporaryQuestionResponseRouter.route("/:questionId").post(
  submitQuestionResponse
);

export default TemporaryQuestionResponseRouter;
