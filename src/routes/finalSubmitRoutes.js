import { finalSubmit } from "../controllers/finalSubmitController.js";
import express from "express";
import authenticateMiddleware from "../middlewares/authenticateMiddleware.js";

const FinalSubmitRouter = express.Router();

FinalSubmitRouter.route("/:quizId/:userId").post(
  authenticateMiddleware,
  finalSubmit
);

export default FinalSubmitRouter;
