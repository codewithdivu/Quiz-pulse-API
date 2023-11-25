import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
// middlewares
import { errorHandlerMiddleware } from "./middlewares/error-handler.js";
import { notFound } from "./middlewares/not-found.js";
// routers
import UserRouter from "./routes/userRoutes.js";

// ---------------------------------------------------------------------

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>QUIZ PULSE");
});

app.use("/api/v1/auth", UserRouter);

// middlewares
app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening at port ${port}...`)
    );
  } catch (error) {
    console.log("error :>> ", error);
  }
};

start();
