import multer from "multer";
import User from "../models/User.js";
import { storage } from "../firebase/config.js";

const upload = multer();

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

const uploadProfilePic = async (req, res) => {
  if (!req.file) {
    res.status(400).json({
      success: false,
      msg: "provide file please",
    });
  }
  const uniqueId = Date.now().toString();
  const storagePath = `profile-pics/${uniqueId}_${req.file.originalname}`;

  const fileUpload = storage.file(storagePath);
  const blobStream = fileUpload.createWriteStream();

  blobStream.on("error", (error) => {
    console.error("Error uploading file:", error);
    throw new Error("Error uploading file");
  });

  blobStream.on("finish", () => {
    const imageUrl = `https://storage.googleapis.com/${storage.name}/${storagePath}`;
    console.log("File uploaded successfully. Image URL:", imageUrl);
    res.json({
      success: true,
      data: imageUrl,
      msg: "profile pic successfully uploaded.",
    });
  });

  blobStream.end(req.file.buffer);
};

export { getAllUsers, getUserByID, updateProfile, uploadProfilePic };
