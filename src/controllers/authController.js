import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      msg: "Please provide both email and password.",
    });
  }
  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    return res.status(409).json({
      success: false,
      msg: "User already exists",
    });
  }

  const user = await User.create(req.body);
  res.status(201).json({ success: true, msg: "user created successfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      msg: "Please provide both email and password.",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      msg: "there is no user exist for this email",
    });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (isPasswordValid) {
    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      msg: "successfully logged in",
      data: user,
      accessToken: token,
    });
  }

  res.status(400).json({
    success: false,
    msg: "password is wrong",
  });
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, msg: "User not found" });
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({ success: true, msg: "Password reset successfully" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, msg: "User not found" });
  }

  // will send password to the email
  res
    .status(200)
    .json({ success: true, msg: "Password reset link sent to your email" });
};

export { register, login, resetPassword, forgotPassword };
