import express from "express";
import "express-async-errors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>hello this is QUIZ PULSE</h1>");
});

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
