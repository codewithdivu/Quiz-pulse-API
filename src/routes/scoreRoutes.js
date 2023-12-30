import express from "express";
import { getQuizScore, getUserScores } from "../controllers/scoreController.js";
import authenticateMiddleware from "../middlewares/authenticateMiddleware.js";

const ScoreRouter = express.Router();

ScoreRouter.route("/:quizId/:userId").post(
  authenticateMiddleware,
  getQuizScore
);
ScoreRouter.route("/:userId").post(authenticateMiddleware, getUserScores);

export default ScoreRouter;
