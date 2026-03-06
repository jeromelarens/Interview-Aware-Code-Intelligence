import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startInterview, submitAnswer } from "../api/interview.api";
import { useInterviewContext } from "../context/InterviewContext";

export default function Interview() {
  const navigate = useNavigate();
  const { interviewType, company } = useInterviewContext();

  const [sessionId, setSessionId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  const [followUps, setFollowUps] = useState([]);
  const [followIndex, setFollowIndex] = useState(0);
  const [isFollowUpMode, setIsFollowUpMode] = useState(false);

  useEffect(() => {
    if (!interviewType || !company) {
      navigate("/type");
      return;
    }

    const initInterview = async () => {
      try {
        const res = await startInterview({
          interviewType,
          company
        });

        setSessionId(res.sessionId);
        setQuestions(res.questions);
      } catch (err) {
        console.error(err);
        navigate("/type");
      } finally {
        setLoading(false);
      }
    };

    initInterview();
  }, [interviewType, company, navigate]);

  const handleSubmit = async () => {
    if (!answer.trim()) return;

    try {
      // MAIN QUESTION MODE
      if (!isFollowUpMode) {
        const res = await submitAnswer({
          sessionId,
          questionId: questions[index].id,
          answer
        });

        setAnswer("");

        if (res.followUps && res.followUps.length > 0) {
          setFollowUps(res.followUps);
          setFollowIndex(0);
          setIsFollowUpMode(true);
          return;
        }

        moveToNextMainQuestion();
      }

      // FOLLOW-UP MODE
      else {
        setAnswer("");

        if (followIndex + 1 < followUps.length) {
          setFollowIndex(prev => prev + 1);
        } else {
          setIsFollowUpMode(false);
          setFollowUps([]);
          moveToNextMainQuestion();
        }
      }

    } catch (err) {
      console.error(err);
    }
  };

  const moveToNextMainQuestion = () => {
    if (index + 1 < questions.length) {
      setIndex(prev => prev + 1);
    } else {
      navigate(`/result/${sessionId}`);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0b0b0b] text-gray-400">
        Initializing interview...
      </div>
    );
  }

  const currentQuestion = isFollowUpMode
    ? followUps[followIndex]
    : questions[index]?.text;

  const totalSteps = questions.length;
  const progressPercent = ((index + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white px-6 py-16 relative overflow-hidden">

      <div className="max-w-4xl mx-auto relative z-10">

        <div className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight">
            Technical Evaluation
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Company:
            <span className="ml-2 text-cyan-400 font-medium">
              {company}
            </span>
          </p>
        </div>

        <div className="mb-10">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>
              Question {index + 1} of {questions.length}
            </span>
            <span>{Math.round(progressPercent)}%</span>
          </div>

          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl mb-8">

          <p className="text-lg leading-relaxed text-gray-200">
            {currentQuestion}
          </p>

        </div>

        <div className="space-y-6">

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Explain your approach clearly..."
            className="w-full h-48 p-5 rounded-2xl bg-black/60 border border-white/10 focus:border-cyan-400 focus:outline-none transition-all duration-300 text-gray-200"
          />

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-10 py-3 rounded-xl font-medium bg-gradient-to-r from-cyan-400 to-purple-500 text-black"
            >
              Submit Answer
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
