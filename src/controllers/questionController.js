import Question from "../models/Question.js";

const createQuestion = async (req, res) => {
  const { createdBy } = req.body;

  if (!createdBy) {
    return res.status(404).json({
      success: false,
      msg: "you have not permission for creating questions",
    });
  }

  const questionData = { ...req.body, createdAt: new Date() };
  const question = await Question.create(questionData);
  res.status(201).json({
    success: true,
    msg: "question created succeessfully",
  });
};

const getQuestion = async (req, res) => {
  const questionId = req.params.id;
  const question = await Question.findById(questionId);

  if (!question) {
    return res.status(404).json({ success: false, msg: "Question not found" });
  }

  res
    .status(200)
    .json({ success: true, data: question, msg: "request successfull" });
};

const updateQuestion = async (req, res) => {
  const questionId = req.params.id;
  const updateQuestionData = req.body;
  const question = await Question.findByIdAndUpdate(
    questionId,
    updateQuestionData,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!question) {
    return res.status(404).json({ success: false, msg: "Question not found" });
  }
  res
    .status(200)
    .json({ success: true, data: question, msg: "successfully updated" });
};

const deleteQuestion = async (req, res) => {
  const questionId = req.params.id;
  const question = await Question.findByIdAndDelete(questionId);

  if (!question) {
    return res.status(404).json({ success: false, msg: "Question not found" });
  }

  res.status(200).json({ success: true, msg: "Question deleted successfully" });
};

const getAllQuestion = async (req, res) => {
  const question = await Question.find();
  const questionCount = await Question.countDocuments();

  res.status(200).json({
    success: true,
    count: questionCount,
    data: question,
    msg: "successfully request",
  });
};

export {
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  getAllQuestion,
};
