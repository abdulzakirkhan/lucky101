import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { app } from "./socket/socket.js";

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://abdulzakir632:zakirnayab143@cluster0.gz21zfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// import routes
import authRoutes from "./routes/auth.routes.js";
// import messageRoute from "./routes/message.routes.js";
import userRoute from "./routes/user.routes.js";

app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

// error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
