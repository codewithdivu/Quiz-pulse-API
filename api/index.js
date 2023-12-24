import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
// DB
import { connectDB } from "../src/db/connect.js";
// middlewares
import { errorHandlerMiddleware } from "../src/middlewares/error-handler.js";
import { notFound } from "../src/middlewares/not-found.js";
import swaggerSpec from "../src/swagger/swagger.js";
// routers
import AuthRouter from "../src/routes/authRoutes.js";
import UserRouter from "../src/routes/userRoutes.js";
import CategoryRouter from "../src/routes/categoryRoutes.js";
import QuestionRouter from "../src/routes/questionRoutes.js";
import QuizRouter from "../src/routes/quizRoutes.js";
import FeedbackRouter from "../src/routes/feedbackRoutes.js";
import TemporaryQuestionResponseRouter from "../src/routes/temporaryQuestionResponseRoutes.js";
import FinalSubmitRouter from "../src/routes/finalSubmitRoutes.js";

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

// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
