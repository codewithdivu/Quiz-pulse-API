import Score from "../models/Score.js";

const getQuizScore = async (req, res) => {
  try {
    const { userId, quizId } = req.body;

    const score = await Score.findOne({ userId, quizId });

    if (!score) {
      return res.status(404).json({ success: false, msg: "Score not found" });
    }

    res.status(200).json({
      success: true,
      msg: "Score retrieved successfully",
      data: score,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

const getUserScores = async (req, res) => {
  try {
    const { userId } = req.body;

    const scores = await Score.find({ userId });

    if (!scores || scores.length === 0) {
      return res.status(404).json({ success: false, msg: "Scores not found" });
    }

    res.status(200).json({
      success: true,
      msg: "Scores retrieved successfully",
      data: scores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

export { getQuizScore, getUserScores };
