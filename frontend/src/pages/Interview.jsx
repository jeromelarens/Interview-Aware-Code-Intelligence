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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF] text-[#64748B] font-[Inter] px-4">
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6">
          <div className="absolute inset-0 border-4 border-[#F1F5F9] rounded-full" />
          <div className="absolute inset-0 border-4 border-[#2563EB] rounded-full border-t-transparent animate-spin" />
        </div>
        <p className="text-base sm:text-lg font-semibold text-[#0F172A] text-center">Initializing interview session...</p>
        <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-center">Preparing questions for {company}</p>
      </div>
    );
  }

  const currentQuestion = isFollowUpMode
    ? followUps[followIndex]
    : questions[index]?.text;

  const totalSteps = questions.length;
  const progressPercent = ((index + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A] px-4 sm:px-6 py-6 sm:py-8 md:py-10 lg:py-12 relative overflow-hidden font-[Inter]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap');

          .font-sora { font-family: 'Sora', sans-serif; }
          .font-inter { font-family: 'Inter', sans-serif; }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fade-in { animation: fadeIn 0.5s ease forwards; }
          .animate-slide-up { animation: slideUp 0.6s ease forwards; }

          /* Prevent horizontal overflow globally */
          html, body {
            overflow-x: hidden;
          }
        `}
      </style>

      {/* Background - scaled for mobile */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 right-4 sm:right-20 w-40 h-40 sm:w-64 sm:h-64 bg-[#2563EB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-20 w-52 h-52 sm:w-80 sm:h-80 bg-[#3b82f6]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 opacity-0 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2 flex-wrap">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold uppercase tracking-wider">
                Live Session
              </span>
              {isFollowUpMode && (
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#FEF3C7] text-[#D97706] text-xs font-bold uppercase tracking-wider">
                  Follow-up
                </span>
              )}
            </div>
            <h1 className="font-sora font-bold text-2xl sm:text-3xl md:text-4xl text-[#0F172A]">
              Technical Interview
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-2 sm:py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] self-start md:self-auto">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#2563EB] flex items-center justify-center shrink-0">
              <span className="font-sora font-bold text-white text-sm sm:text-lg">
                {company.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#64748B] uppercase tracking-wider font-semibold">Company</p>
              <p className="font-sora font-bold text-[#0F172A] text-sm sm:text-base truncate">{company}</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-5 sm:mb-6 md:mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center mb-2 sm:mb-3 flex-wrap gap-1">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                Question {index + 1} of {questions.length}
              </span>
              {isFollowUpMode && (
                <span className="text-xs sm:text-sm text-[#64748B]">
                  • Follow-up {followIndex + 1} of {followUps.length}
                </span>
              )}
            </div>
            <span className="font-sora font-bold text-[#2563EB] text-sm sm:text-base">{Math.round(progressPercent)}%</span>
          </div>

          <div className="h-2 sm:h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2563EB] rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg shadow-[#0F172A]/5 border border-[#E2E8F0] p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 opacity-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
              <span className="font-sora font-bold text-[#2563EB] text-sm sm:text-base">Q</span>
            </div>
            <div className="min-w-0">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#0F172A] font-medium">
                {currentQuestion}
              </p>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-[#64748B]">
                Take your time to think through the problem before responding. Explain your approach clearly.
              </p>
            </div>
          </div>
        </div>

        {/* Answer Input */}
        <div className="space-y-4 sm:space-y-6 opacity-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="relative">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your solution and explanation here..."
              className="w-full h-40 sm:h-48 md:h-56 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border-2 border-[#E2E8F0] focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 focus:outline-none transition-all duration-200 text-[#0F172A] placeholder-[#94A3B8] resize-none font-inter leading-relaxed text-sm sm:text-base"
            />
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-xs text-[#94A3B8] font-medium">
              {answer.length} chars
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#64748B]">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Be specific about time/space complexity</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className="group px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/25 hover:bg-[#1d4ed8] hover:shadow-xl hover:shadow-[#2563EB]/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap"
            >
              <span className="truncate">
                {isFollowUpMode && followIndex + 1 < followUps.length ? (
                  "Next Follow-up"
                ) : isFollowUpMode ? (
                  "Back to Main"
                ) : index + 1 < questions.length ? (
                  "Submit & Continue"
                ) : (
                  "Finish Interview"
                )}
              </span>
              <svg className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tips Footer */}
        <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="p-3 sm:p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center mb-2 sm:mb-3">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#0F172A] mb-0.5 sm:mb-1">Think Aloud</p>
            <p className="text-xs text-[#64748B]">Explain your reasoning process clearly</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center mb-2 sm:mb-3">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#0F172A] mb-0.5 sm:mb-1">Optimize</p>
            <p className="text-xs text-[#64748B]">Discuss trade-offs and improvements</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center mb-2 sm:mb-3">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#0F172A] mb-0.5 sm:mb-1">Take Time</p>
            <p className="text-xs text-[#64748B]">Quality over speed in your responses</p>
          </div>
        </div>

      </div>
    </div>
  );
}