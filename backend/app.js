import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import interviewRoutes from "./src/routes/interview.routes.js";

dotenv.config();

const app = express();

// 🔑 REQUIRED MIDDLEWARE
app.use(cors({
  origin: "http://localhost:5173", // frontend port (Vite)
  credentials: true
}));
app.use(express.json());

// 🔑 ROUTES (THIS WAS MISSING / WRONG)
app.use("/api/interview", interviewRoutes);

// 🔑 HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Backend running");
});

export default app;
