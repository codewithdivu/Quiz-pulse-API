import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  difficultyLevel: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: [true, "Difficulty level is required"],
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: [true, "Question ID is required"],
    },
  ],
  description: {
    type: String,
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "CreatedBy is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Quiz = mongoose.model("Quiz", QuizSchema);

export default Quiz;
