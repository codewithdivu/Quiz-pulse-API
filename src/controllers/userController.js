import User from "../models/User.js";

const register = async (req, res) => {
  const { email, password } = req.body;
  console.log("email :>> ", email);
  console.log("password :>> ", password);
  const user = await User.create({ email, password });
  res.status(200).json({ success: true, msg: "user created successfully" });
};

export { register };
