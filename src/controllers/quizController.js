import Quiz from "../models/Quiz.js";

const createQuiz = async (req, res) => {
  const { createdBy } = req.body;

  if (!createdBy) {
    return res.status(404).json({
      success: false,
      msg: "you have not permission for creating quiz",
    });
  }

  const quizData = { ...req.body, createdAt: new Date() };
  const quiz = await Quiz.create(quizData);
  res.status(201).json({ success: true, msg: "quiz created succeessfully" });
};

const getQuiz = async (req, res) => {
  const quizId = req.params.id;
  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    return res.status(404).json({ success: false, msg: "Quiz not found" });
  }

  res
    .status(200)
    .json({ success: true, data: quiz, msg: "request successfull" });
};

const updateQuiz = async (req, res) => {
  const quizId = req.params.id;
  const updateQuizData = req.body;
  const quiz = await Quiz.findByIdAndUpdate(quizId, updateQuizData, {
    new: true,
    runValidators: true,
  });
  if (!quiz) {
    return res.status(404).json({ success: false, msg: "Quiz not found" });
  }
  res
    .status(200)
    .json({ success: true, data: quiz, msg: "successfully updated" });
};

const deleteQuiz = async (req, res) => {
  const quizId = req.params.id;
  const quiz = await Quiz.findByIdAndDelete(quizId);

  if (!quiz) {
    return res.status(404).json({ success: false, msg: "quiz not found" });
  }

  res.status(200).json({ success: true, msg: "quiz deleted successfully" });
};

const getAllQuiz = async (req, res) => {
  const quiz = await Quiz.find();
  const quizCount = await Quiz.countDocuments();

  res.status(200).json({
    success: true,
    count: quizCount,
    data: quiz,
    msg: "successfully request",
  });
};

export { createQuiz, getAllQuiz, getQuiz, updateQuiz, deleteQuiz };
