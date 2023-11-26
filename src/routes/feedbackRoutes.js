import express from "express";
import {
  getQuizFeedbacks,
  submitFeedback,
  getUserFeedbacks,
  getFeedback,
} from "../controllers/feedbackController.js";

const FeedbackRouter = express.Router();

FeedbackRouter.route("/submitFeedback").post(submitFeedback);
FeedbackRouter.route("/quiz/:quizId").get(getQuizFeedbacks);
FeedbackRouter.route("/user/:userId").get(getUserFeedbacks);
FeedbackRouter.route("/:id").get(getFeedback);

export default FeedbackRouter;
