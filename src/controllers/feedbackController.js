import Feedback from "../models/Feedback.js";
import Quiz from "../models/Quiz.js";
import User from "../models/User.js";

const submitFeedback = async (req, res) => {
  const { userId, quizId, rating, comments } = req.body;

  const user = await User.findById(userId);
  const quiz = await Quiz.findById(quizId);

  if (!user || !quiz) {
    return res
      .status(404)
      .json({ success: false, msg: "User or Quiz not found" });
  }

  const feedback = await Feedback.create(req.body);

  res.status(201).json({
    success: true,
    msg: "Feedback submitted successfully",
  });
};

const getQuizFeedbacks = async (req, res) => {
  const { quizId } = req.params;

  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    return res.status(404).json({ success: false, msg: "Quiz not found" });
  }

  const feedbacks = await Feedback.find({ quizId });
  const feedbackCount = await Feedback.countDocuments();

  res.status(200).json({
    success: true,
    count: feedbackCount,
    data: feedbacks,
    msg: "request successfull",
  });
};

const getUserFeedbacks = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ success: false, msg: "User not found" });
  }

  const feedbacks = await Feedback.find({ userId });
  const feedbackCount = await Feedback.countDocuments();

  res.status(200).json({
    success: true,
    count: feedbackCount,
    data: feedbacks,
    msg: "request successfull",
  });
};

const getFeedback = async (req, res) => {
  const { id } = req.params;

  const feedback = await Feedback.findById(id);

  if (!feedback) {
    return res.status(404).json({ success: false, msg: "Feedback not found" });
  }

  res
    .status(200)
    .json({ success: true, data: feedback, msg: "request succeessfull" });
};

export { submitFeedback, getQuizFeedbacks, getUserFeedbacks, getFeedback };
