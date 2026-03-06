import express from "express";
import {
  startInterview,
  submitAnswer,
  getFinalResult
} from "../controllers/interview.controller.js";

const router = express.Router();

router.post("/start", startInterview);
router.post("/submit-answer", submitAnswer);
router.get("/result/:sessionId", getFinalResult);

export default router;
