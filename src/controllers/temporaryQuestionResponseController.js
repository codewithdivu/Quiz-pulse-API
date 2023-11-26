import TemporaryQuestionResponse from "../models/TemporaryQuestionResponse.js";
import Question from "../models/Question.js";

const submitQuestionResponse = async (req, res) => {
  const { userId, quizId, questionId, selectedAnswer } = req.body;

  const question = await Question.findById(questionId);

  if (!question) {
    return res.status(404).json({ success: false, msg: "Question not found" });
  }

  const isCorrect = selectedAnswer === question.correct_answer;

  await TemporaryQuestionResponse.create({
    userId,
    quizId,
    questionId,
    selectedAnswer,
    isCorrect,
  });

  res
    .status(201)
    .json({ success: true, msg: "Response recorded successfully" });
};

export { submitQuestionResponse };
