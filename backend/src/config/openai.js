// src/config/openai.js

import dotenv from "dotenv";
import OpenAI from "openai";

// 🔥 Load env HERE
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is missing in environment variables");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
