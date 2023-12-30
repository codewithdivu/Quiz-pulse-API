import express from "express";
import {
  getQuizScore,
  getUserScores,
  getAllScores,
} from "../controllers/scoreController.js";
import authenticateMiddleware from "../middlewares/authenticateMiddleware.js";

const ScoreRouter = express.Router();

ScoreRouter.route("/:quizId/:userId").post(
  authenticateMiddleware,
  getQuizScore
);
ScoreRouter.route("/:userId").post(authenticateMiddleware, getUserScores);

ScoreRouter.route("/").get(authenticateMiddleware, getAllScores);

export default ScoreRouter;
