import express from "express";
import {
  getQuizFeedbacks,
  submitFeedback,
  getUserFeedbacks,
  getFeedback,
} from "../controllers/feedbackController.js";
import authenticateMiddleware from "../middlewares/authenticateMiddleware.js";

const FeedbackRouter = express.Router();

FeedbackRouter.route("/submitFeedback").post(
  authenticateMiddleware,
  submitFeedback
);
FeedbackRouter.route("/quiz/:quizId").get(
  authenticateMiddleware,
  getQuizFeedbacks
);
FeedbackRouter.route("/user/:userId").get(
  authenticateMiddleware,
  getUserFeedbacks
);
FeedbackRouter.route("/:id").get(authenticateMiddleware, getFeedback);

export default FeedbackRouter;
