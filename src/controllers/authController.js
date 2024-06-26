import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import otpGenerator from "otp-generator";
import { mailTransporter } from "../utils/mailTransporter.js";

// Map to store generated OTPs, where keys are user email addresses
const otpMap = new Map();

const generateOTP = (email) => {
  const length = 6;
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  otpMap.set(email, otp);
  return otp;
};

const verifyOTP = (email, otp) => {
  const storedOTP = otpMap.get(email);

  return otp === storedOTP;
};

// ------------------- auth-controller-------------------------

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
  const { email, newPassword, otp } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      msg: "Please provide email, OTP, and a new password.",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ success: false, msg: "User not found" });
  }

  const isOTPValid = verifyOTP(email, otp);

  if (!isOTPValid) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid OTP", status: 400 });
  }

  user.password = newPassword;
  await user.save();

  otpMap.delete(email);

  res.status(200).json({ success: true, msg: "Password reset successfully" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("email :>> ", email);

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json({ success: false, msg: "User not found", status: 404 });
  }

  const otp = generateOTP(email);

  const mailOptions = {
    from: "mavadiyadivyesh56@gmail.com",
    to: email,
    subject: "Forgot-password",
    text: `OTP for this forgot-password for quizy-pulse app is ${otp}`,
  };

  await mailTransporter.sendMail(mailOptions);

  res
    .status(200)
    .json({ success: true, msg: "OTP send successfully to your email" });
};

export { register, login, resetPassword, forgotPassword };
