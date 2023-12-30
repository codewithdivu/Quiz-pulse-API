import multer from "multer";
import User from "../models/User.js";
import { storage } from "../firebase/config.js";
// import serviceAccount from "../../service.json" assert { type: "json" };

const upload = multer();

const getAllUsers = async (req, res) => {
  // pagination is applied
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const skip = (page - 1) * pageSize;

  const users = await User.find({ role: "user" }).skip(skip).limit(pageSize);

  const userCount = await User.countDocuments({ role: "user" });

  res.status(200).json({
    success: true,
    count: userCount,
    currentPage: page,
    totalPages: Math.ceil(userCount / pageSize),
    data: users,
    msg: "Successfully retrieved users.",
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
      msg: "Provide a file, please",
    });
    return;
  }

  const uniqueId = Date.now().toString();
  const storagePath = `profile-pics/${uniqueId}_${req.file.originalname}`;

  const fileUpload = storage.file(storagePath);
  const blobStream = fileUpload.createWriteStream();

  blobStream.on("error", (error) => {
    console.error("Error uploading file:", error);
    res.status(500).json({
      success: false,
      msg: "Error uploading file",
    });
  });

  blobStream.on("finish", async () => {
    try {
      // Generate a signed URL for the file
      const [url] = await fileUpload.getSignedUrl({
        action: "read",
        expires: Date.now() + 15 * 60 * 1000, // URL expires in 15 minutes
      });

      console.log("File uploaded successfully. Signed Image URL:", url);
      res.json({
        success: true,
        data: url,
        msg: "Profile pic successfully uploaded.",
      });
    } catch (error) {
      console.error("Error generating signed URL:", error);
      res.status(500).json({
        success: false,
        msg: "Error generating signed URL",
      });
    }
  });

  blobStream.end(req.file.buffer);
};

export { getAllUsers, getUserByID, updateProfile, uploadProfilePic };
