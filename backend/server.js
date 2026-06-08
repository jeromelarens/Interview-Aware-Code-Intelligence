import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";

import interviewRoutes from "./src/routes/interview.routes.js";
import { openai } from "./src/config/openai.js"; // ✅ ADD THIS

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* ========================
   MongoDB
======================== */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("DB Error:", err);
    process.exit(1);
  });

/* ========================
   User Model
======================== */

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
});

const User = mongoose.model("User", userSchema);

/* ========================
   Mail Setup
======================== */


/* ========================
   Send OTP
======================== */

app.post("/api/auth/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      token,
      user,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Login failed",
    });
  }
});

/* ========================
   Verify OTP
======================== */


/* ========================
   Interview Routes
======================== */

app.use("/api/interview", interviewRoutes);

/* ========================
   🔥 TEST OPENAI ROUTE
======================== */
app.get("/test-ai", async (req, res) => {
  try {
    console.log("🔍 Testing OpenAI connection...");

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // keep mini for safe test
      messages: [
        { role: "user", content: "Say hello in one short sentence." }
      ],
    });

    console.log("✅ OpenAI Response:", response);

    res.json({
      success: true,
      reply: response.choices[0].message.content
    });

  } catch (err) {
    console.error("❌ FULL OPENAI ERROR OBJECT:");
    console.error(err);

    console.error("❌ ERROR MESSAGE:");
    console.error(err?.message);

    console.error("❌ ERROR STATUS:");
    console.error(err?.status);

    console.error("❌ ERROR RESPONSE:");
    console.error(err?.response);

    res.status(500).json({
      success: false,
      error: err?.message || "AI failed"
    });
  }
});

/* ========================
   Health Check
======================== */

app.get("/", (req, res) => {
  res.send("Backend running");
});

/* ========================
   Start Server
======================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
