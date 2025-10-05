import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import productRoutes from "./product/route.js";
import userRoutes from "./user/route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

app.use("/product", productRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/`);
});
