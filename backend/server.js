import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
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
  otp: String,
  otpExpiry: Date,
});

const User = mongoose.model("User", userSchema);

/* ========================
   Mail Setup
======================== */

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
/* ========================
   Send OTP
======================== */

app.post("/api/auth/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, otp, otpExpiry });
    } else {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Login OTP",
      text: `Your OTP is ${otp}`,
    });

    res.json({ message: "OTP sent successfully" });

  } catch (error) {
    console.error("OTP Send Error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

/* ========================
   Verify OTP
======================== */

app.post("/api/auth/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ token });

  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).json({ message: "OTP verification failed" });
  }
});

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
