import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app } from "./socket/socket.js"; // Assuming app is being exported from this file

dotenv.config();

// Connect to MongoDB
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

const PORT = process.env.PORT || 300;

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Import routes
import authRoutes from "./routes/auth.routes.js";
// import messageRoute from "./routes/message.routes.js";
import userRoute from "./routes/user.routes.js";

// Use routes
app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});



