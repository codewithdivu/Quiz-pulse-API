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

// ---------------------------------------------------------------------

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Quiz Pulse");
});

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/category", CategoryRouter);

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
