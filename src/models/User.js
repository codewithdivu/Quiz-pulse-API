import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
});

// // Hash the password before saving to the database
// UserSchema.pre("save", async function (next) {
//   const saltRounds = 10;
//   this.password = await bcrypt.hash(this.password, saltRounds);
//   next();
// });

// // Method to compare a provided password with the hashed password in the database
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

const User = mongoose.model("User", UserSchema);

export default User;
