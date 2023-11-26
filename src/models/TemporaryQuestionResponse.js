import mongoose from "mongoose";

const TemporaryQuestionResponseSchema = new mongoose.Schema({
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
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: [true, "Question ID is required"],
  },
  selectedAnswer: {
    type: String,
    required: [true, "Selected answer is required"],
  },
  isCorrect: {
    type: Boolean,
    required: [true, "Is correct flag is required"],
  },
});

const TemporaryQuestionResponse = mongoose.model(
  "TemporaryQuestionResponse",
  TemporaryQuestionResponseSchema
);

export default TemporaryQuestionResponse;
