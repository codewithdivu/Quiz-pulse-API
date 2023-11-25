import mongoose from "mongoose";
mongoose.set("strictQuery", false);

export default connectDB = (url) => {
  return mongoose.connect(
    "mongodb+srv://codewithdivu:divu0017@cluster0.oi5oyjl.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );
};
