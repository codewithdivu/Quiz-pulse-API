import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign({ userId: user._id }, "divubhai", {
    expiresIn: "12h",
  });
  return token;
};
