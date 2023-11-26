import Score from "../models/Score.js";
import TemporaryQuestionResponse from "../models/TemporaryQuestionResponse.js";

const finalSubmit = async (req, res) => {
  const { userId, quizId } = req.body;
  const maxPoint = 5;

  const responses = await TemporaryResponse.find({ userId, quizId });

  let countOfCorrect = responses.reduce(
    (count, obj) => count + (obj.isCorrect === true ? 1 : 0),
    0
  );

  let obtainedScore = countOfCorrect * maxPoint;
  let totalScore = responses.length > 0 ? responses.length * maxPoint : 0;

  let percentageScore = (obtainedScore / totalScore) * 100;

  await Score.create({
    userId,
    quizId,
    score: obtainedScore,
    maxScore: totalScore,
    percentage: percentageScore,
  });

  await TemporaryResponse.deleteMany({ userId, quizId });

  res
    .status(200)
    .json({ success: true, msg: "Final submission completed successfully" });
};

export { finalSubmit };
