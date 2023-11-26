import { finalSubmit } from "../controllers/finalSubmitController.js";
import express from "express";

const FinalSubmitRouter = express.Router();

FinalSubmitRouter.route("/:quizId/:userId").post(finalSubmit);

export default FinalSubmitRouter;
