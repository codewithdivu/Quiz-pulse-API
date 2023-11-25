import User from "../models/User.js";

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" });
  const userCount = await User.countDocuments();

  res.status(200).json({
    success: true,
    count: userCount,
    data: users,
    msg: "successfully request",
  });
};

const getUserByID = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ success: false, msg: "User not found" });
  }
  res
    .status(200)
    .json({ success: true, data: user, msg: "successfully request" });
};

const updateProfile = async (req, res) => {
  const userId = req.params.id;
  const updatedProfile = req.body;

  const user = await User.findByIdAndUpdate(userId, updatedProfile, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(404).json({ success: false, msg: "User not found" });
  }

  res
    .status(200)
    .json({ success: true, data: user, msg: "successfully updated" });
};

export { getAllUsers, getUserByID, updateProfile };
