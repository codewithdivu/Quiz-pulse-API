import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: [true, "Quiz ID is required"],
  },
  score: {
    type: Number,
    required: [true, "Score is required"],
  },
  maxScore: {
    type: Number,
    required: [true, "Max score is required"],
  },
  percentage: {
    type: Number,
    required: [true, "Percentage is required"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Score = mongoose.model("Score", ScoreSchema);

export default Score;
