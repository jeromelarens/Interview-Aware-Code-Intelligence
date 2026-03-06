import { useState } from "react";
import { startInterview, submitCode, submitAnswer } from "../api/interview.api";

export const useInterviewSession = ({
  interviewType,
  company,
  setSessionId,
  navigate
}) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔥 STEP 1: INIT SESSION
  const initSession = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await startInterview({ interviewType, company });

      if (!res?.sessionId) {
        throw new Error("Session ID missing");
      }

      setSessionId(res.sessionId);

      // 🔥 VERY IMPORTANT — MOVE TO INTERVIEW PAGE
      navigate("/interview");
    } catch (err) {
      console.error(err);
      setError("Failed to start interview");
    } finally {
      // 🔥 THIS WAS MISSING / NOT RUNNING
      setLoading(false);
    }
  };

  // STEP 2: SUBMIT CODE
  const submitCandidateCode = async (sessionId, code) => {
    try {
      setLoading(true);
      const res = await submitCode(sessionId, code);
      setQuestions(res.questions || []);
      setCurrentIndex(0);
    } catch (err) {
      setError("Code submission failed");
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: SUBMIT ANSWER
  const submitCandidateAnswer = async (sessionId, answer) => {
    try {
      setLoading(true);

      await submitAnswer({
        sessionId,
        questionId: questions[currentIndex].id,
        answer
      });

      setCurrentIndex(prev => prev + 1);
    } catch (err) {
      setError("Answer submission failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    questions,
    currentIndex,
    initSession,
    submitCandidateCode,
    submitCandidateAnswer
  };
};
