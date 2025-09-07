import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rootRouter from "./routes/index";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/bridgepay";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(8000, () => {
      console.log("Server running on http://localhost:8000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
