import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
// DB
import { connectDB } from "./db/connect.js";
// middlewares
import { errorHandlerMiddleware } from "./middlewares/error-handler.js";
import { notFound } from "./middlewares/not-found.js";
// routers
import AuthRouter from "./routes/authRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import CategoryRouter from "./routes/categoryRoutes.js";
import QuestionRouter from "./routes/questionRoutes.js";
import QuizRouter from "./routes/quizRoutes.js";
import FeedbackRouter from "./routes/feedbackRoutes.js";
import TemporaryQuestionResponseRouter from "./routes/temporaryQuestionResponseRoutes.js";
import FinalSubmitRouter from "./routes/finalSubmitRoutes.js";

// ---------------------------------------------------------------------

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Quiz Pulse</h1>");
});

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/question", QuestionRouter);
app.use("/api/v1/quiz", QuizRouter);
app.use("/api/v1/feedback", FeedbackRouter);
app.use("/api/v1/submitQuestion", TemporaryQuestionResponseRouter);
app.use("/api/v1/finalSubmit", FinalSubmitRouter);

// middlewares
app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(
      "mongodb+srv://codewithdivu:divu0017@cluster0.oi5oyjl.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(port, () =>
      console.log(`Server is listening at port ${port}...`)
    );
  } catch (error) {
    console.log("error :>> ", error);
  }
};

start();

export default app;
