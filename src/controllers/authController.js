import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import otpGenerator from "otp-generator";
import { mailTransporter } from "../utils/mailTransporter.js";

// Map to store generated OTPs, where keys are user email addresses
const otpMap = new Map();

const generateOTP = (email) => {
  const otp = otpGenerator.generate(6, {
    digits: true,
  });

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
    return res.status(404).json({ success: false, msg: "User not found" });
  }

  const isOTPValid = verifyOTP(email, otp);

  if (!isOTPValid) {
    return res.status(401).json({ success: false, msg: "Invalid OTP" });
  }

  user.password = newPassword;
  await user.save();

  otpMap.delete(email);

  res.status(200).json({ success: true, msg: "Password reset successfully" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, msg: "User not found" });
  }

  const otp = generateOTP(email);

  const mailOptions = {
    from: "mavadiyadivyesh56@gmail.com",
    to: "divu0017@gmail.com", // here we have to change email with user email but for now we keep this
    subject: "Forgot-password",
    text: `OTP for this forgot-password for quizy-pulse app is ${otp}`,
  };

  await mailTransporter.sendMail(mailOptions);

  res
    .status(200)
    .json({ success: true, msg: "OTP send successfully to your email" });
};

export { register, login, resetPassword, forgotPassword };
