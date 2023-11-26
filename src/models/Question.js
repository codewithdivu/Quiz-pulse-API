import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["text", "image"],
    required: [true, "Type is required"],
  },
  difficultyLevel: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: [true, "Difficulty level is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  tags: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    required: [false, "Description is required"],
  },
  points: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "CreatedBy is required"],
  },
  question: {
    type: {
      type: String,
      enum: ["text", "image"],
      required: [true, "Question type is required"],
    },
    text: String,
    imageUrl: String,
  },
  correct_answer: {
    type: String,
    required: [true, "Correct answer is required"],
  },
  options: [
    {
      type: {
        type: String,
        enum: ["text", "image"],
        required: [true, "Option type is required"],
      },
      text: String,
      imageUrl: String,
    },
  ],
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
