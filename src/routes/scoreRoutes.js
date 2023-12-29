import express from "express";
import { getQuizScore } from "../controllers/scoreController.js";
import authenticateMiddleware from "../middlewares/authenticateMiddleware.js";

const ScoreRouter = express.Router();

ScoreRouter.route("/:quizId/:userId").post(
  authenticateMiddleware,
  getQuizScore
);

export default ScoreRouter;
