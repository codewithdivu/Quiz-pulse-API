import express from "express";
import { submitQuestionResponse } from "../controllers/TemporaryQuestionResponseController.js";
import authenticateMiddleware from "../middlewares/authenticateMiddleware.js";

const TemporaryQuestionResponseRouter = express.Router();

TemporaryQuestionResponseRouter.route("/:questionId").post(
  authenticateMiddleware,
  submitQuestionResponse
);

export default TemporaryQuestionResponseRouter;
