import InterviewSession from "../models/InterviewSession.model.js";
import { generateQuestions } from "../services/questionEngine.service.js";
import { evaluateInterview } from "../services/evaluateInterview.service.js";
import { generateFollowUps } from "../services/followUpGenerator.service.js";

/**
 * START INTERVIEW
 */
export const startInterview = async (req, res) => {
  const { interviewType, company } = req.body;

  if (!interviewType || !company) {
    return res.status(400).json({
      error: "interviewType and company are required"
    });
  }

  const questions = generateQuestions(interviewType, company);

  const session = await InterviewSession.create({
    interviewType,
    company,
    questions,
    answers: [],
    completed: false
  });

  res.json({
    sessionId: session._id,
    questions
  });
};

/**
 * SUBMIT ANSWER (UPDATED WITH FOLLOW-UPS)
 */
export const submitAnswer = async (req, res) => {
  try {
    const { sessionId, questionId, answer } = req.body;

    const session = await InterviewSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Save answer
    session.answers.push({ questionId, answer });

    // Generate follow-ups immediately
    const followUps = generateFollowUps(
      answer,
      session.interviewType
    );

    // If last main question → evaluate
    if (session.answers.length === session.questions.length) {
      session.result = await evaluateInterview(session);
      session.completed = true;
    }

    await session.save();

    return res.json({
      success: true,
      followUps
    });

  } catch (err) {
    console.error("Submit Answer Error:", err);
    return res.status(500).json({
      error: "Submit failed"
    });
  }
};


/**
 * FINAL RESULT
 */
export const getFinalResult = async (req, res) => {
  const { sessionId } = req.params;

  const session = await InterviewSession.findById(sessionId);

  if (!session || !session.completed) {
    return res.status(404).json({
      error: "Result not available"
    });
  }

  res.json(session.result);
};
