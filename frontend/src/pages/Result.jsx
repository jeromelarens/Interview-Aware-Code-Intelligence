import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFinalResult } from "../api/interview.api";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from "recharts";

/* ---------------- SVG RADIAL SCORE ---------------- */

const RadialScore = ({ score, size = "md" }) => {
  const sizeMap = {
    sm: { radius: 48, stroke: 6, fontSize: 20, subFontSize: 10 },
    md: { radius: 64, stroke: 8, fontSize: 24, subFontSize: 11 },
    lg: { radius: 80, stroke: 10, fontSize: 28, subFontSize: 12 },
  };
  const { radius, stroke, fontSize, subFontSize } = sizeMap[size] || sizeMap.md;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = (score / 10) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="transform -rotate-90" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
      <circle
        stroke="#F1F5F9"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#2563EB"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${progress} ${circumference}`}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{ transition: "stroke-dasharray 1.2s ease" }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#0F172A"
        fontSize={fontSize}
        fontWeight="bold"
        className="font-sora"
        transform={`rotate(90, ${radius}, ${radius})`}
      >
        {score}
      </text>
      <text
        x="50%"
        y="65%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#64748B"
        fontSize={subFontSize}
        transform={`rotate(90, ${radius}, ${radius})`}
      >
        / 10
      </text>
    </svg>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

export default function Result() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("Invalid interview session");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const data = await getFinalResult(sessionId);
        setResult(data || null);
      } catch {
        setError("Failed to load interview result");
      } finally {
        setLoading(false);
      }
    })();
  }, [sessionId]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF] text-[#64748B] font-[Inter] px-4">
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6">
          <div className="absolute inset-0 border-4 border-[#F1F5F9] rounded-full" />
          <div className="absolute inset-0 border-4 border-[#2563EB] rounded-full border-t-transparent animate-spin" />
        </div>
        <p className="text-base sm:text-lg font-semibold text-[#0F172A] text-center">Analyzing your performance...</p>
        <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-center">Generating comprehensive report</p>
      </div>
    );

  if (error || !result)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF] text-[#0F172A] font-[Inter] px-4">
        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-red-50 flex items-center justify-center mb-4 sm:mb-6">
          <svg className="w-7 h-7 sm:w-10 sm:h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">Result unavailable</p>
        <button
          onClick={() => navigate("/")}
          className="px-5 sm:px-8 py-2.5 sm:py-3 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-[#1d4ed8] transition-colors shadow-lg shadow-[#2563EB]/25 text-sm sm:text-base"
        >
          Restart Interview
        </button>
      </div>
    );

  const {
    codeLevel = "N/A",
    finalVerdict = {},
    interviewerConfidence = {},
    trustSignals = {},
    strengths = [],
    weaknesses = [],
    interviewerNote = "",
    aiSolution = {},
    perQuestion = []
  } = result;

  const { decision = "N/A", finalScore = 0 } = finalVerdict;

  /* ---------------- REAL RADAR DATA ---------------- */

  const totalQuestions = perQuestion.length || 1;

  const avgScore =
    perQuestion.reduce((acc, q) => acc + (q.score || 0), 0) /
    totalQuestions;

  const logicScore = Math.min(100, avgScore * 20);

  const tradeOffScore =
    100 -
    (perQuestion.filter(q =>
      q.issues?.some(i =>
        i.toLowerCase().includes("trade")
      )
    ).length /
      totalQuestions) *
      100;

  const scalabilityScore =
    100 -
    (perQuestion.filter(q =>
      q.issues?.some(i =>
        i.toLowerCase().includes("scalability") ||
        i.toLowerCase().includes("nested")
      )
    ).length /
      totalQuestions) *
      100;

  const clarityScore =
    100 -
    (perQuestion.filter(q =>
      q.issues?.some(i =>
        i.toLowerCase().includes("edge")
      )
    ).length /
      totalQuestions) *
      100;

  const consistencyScore = interviewerConfidence.score || 0;

  const radarData = [
    { subject: "Logic", value: Math.round(logicScore), fullMark: 100 },
    { subject: "Trade-offs", value: Math.round(tradeOffScore), fullMark: 100 },
    { subject: "Scalability", value: Math.round(scalabilityScore), fullMark: 100 },
    { subject: "Clarity", value: Math.round(clarityScore), fullMark: 100 },
    { subject: "Consistency", value: Math.round(consistencyScore), fullMark: 100 }
  ];

  const maxPerQuestionScore = Math.max(
    ...perQuestion.map(q => q.score || 0),
    1
  );

  /* ---------------- PDF ---------------- */

  const downloadPDF = async () => {
    const element = document.getElementById("report-container");
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("Interview_Report.pdf");
  };

  const shareLink = `${window.location.origin}/result/${sessionId}`;

  const getDecisionColor = (decision) => {
    const d = decision.toLowerCase();
    if (d.includes("hire") || d.includes("strong")) return "text-green-600 bg-green-50 border-green-200";
    if (d.includes("reject") || d.includes("no")) return "text-red-600 bg-red-50 border-red-200";
    return "text-amber-600 bg-amber-50 border-amber-200";
  };

  const getDecisionBadge = (decision) => {
    const d = decision.toLowerCase();
    if (d.includes("hire") || d.includes("strong")) return "bg-green-500";
    if (d.includes("reject") || d.includes("no")) return "bg-red-500";
    return "bg-amber-500";
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A] px-4 sm:px-6 py-6 sm:py-8 md:py-10 lg:py-12 relative overflow-hidden font-[Inter]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap');

          .font-sora { font-family: 'Sora', sans-serif; }
          .font-inter { font-family: 'Inter', sans-serif; }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fade-in { animation: fadeIn 0.6s ease forwards; }
          .animate-slide-up { animation: slideUp 0.6s ease forwards; }

          /* Prevent horizontal overflow globally */
          html, body {
            overflow-x: hidden;
          }

          /* Monospace code block responsive */
          .code-block {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            word-break: break-word;
          }
          .code-block::-webkit-scrollbar {
            height: 4px;
          }
          .code-block::-webkit-scrollbar-track {
            background: transparent;
          }
          .code-block::-webkit-scrollbar-thumb {
            background: #CBD5E1;
            border-radius: 2px;
          }
        `}
      </style>

      <div id="report-container" className="max-w-6xl mx-auto space-y-6 sm:space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 sm:gap-6 md:gap-8 pb-6 sm:pb-8 border-b border-[#E2E8F0] opacity-0 animate-fade-in">
          <div className="min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#2563EB] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#2563EB] uppercase tracking-wider">Interview Complete</span>
            </div>
            <h1 className="font-sora font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0F172A]">Performance Report</h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 sm:mt-2">Session ID: {sessionId}</p>
          </div>

          <div className="flex flex-col items-center self-start md:self-auto">
            <div className="block sm:hidden">
              <RadialScore score={finalScore} size="sm" />
            </div>
            <div className="hidden sm:block md:hidden">
              <RadialScore score={finalScore} size="md" />
            </div>
            <div className="hidden md:block">
              <RadialScore score={finalScore} size="lg" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#64748B] mt-1 sm:mt-2">Overall Score</span>
          </div>
        </div>

        {/* VERDICT */}
        <div className={`rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border-2 ${getDecisionColor(decision)} opacity-0 animate-slide-up`} style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${getDecisionBadge(decision)} animate-pulse shrink-0`} />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Final Decision</span>
          </div>
          <h2 className="font-sora font-bold text-2xl sm:text-3xl md:text-4xl mb-2">
            {decision}
          </h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 sm:mt-4">
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/50 border border-current">
              <span className="text-xs uppercase tracking-wider opacity-70">Code Level</span>
              <p className="font-semibold text-sm sm:text-base">{codeLevel}</p>
            </div>
            {interviewerNote && (
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/50 border border-current">
                <span className="text-xs uppercase tracking-wider opacity-70">Interviewer Note</span>
                <p className="font-semibold text-sm sm:text-base">{interviewerNote}</p>
              </div>
            )}
          </div>
        </div>

        {/* RADAR CHART & METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 opacity-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-[#F8FAFC] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-[#E2E8F0]">
            <h2 className="font-sora font-bold text-lg sm:text-xl mb-4 sm:mb-6 flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              Skill Breakdown
            </h2>
            <div className="h-56 sm:h-64 md:h-72 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    dataKey="value"
                    stroke="#2563EB"
                    fill="#2563EB"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* KEY METRICS */}
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-[#F8FAFC] rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-[#E2E8F0]">
              <h3 className="font-sora font-bold text-base sm:text-lg mb-3 sm:mb-4">Key Metrics</h3>
              <div className="space-y-3 sm:space-y-4">
                {radarData.map((item, idx) => (
                  <div key={item.subject}>
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="font-medium text-[#0F172A]">{item.subject}</span>
                      <span className="font-bold text-[#2563EB]">{item.value}%</span>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#2563EB] rounded-full transition-all duration-1000"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {trustSignals && (
              <div className="bg-[#F8FAFC] rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-[#E2E8F0]">
                <h3 className="font-sora font-bold text-base sm:text-lg mb-2 sm:mb-3">Trust Signals</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {Object.entries(trustSignals).map(([key, value]) => (
                    <span key={key} className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-semibold">
                      {key}: {value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* QUESTION PERFORMANCE */}
        <div className="bg-[#F8FAFC] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-[#E2E8F0] opacity-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="font-sora font-bold text-lg sm:text-xl mb-4 sm:mb-6 flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Question Performance
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {perQuestion.map((q, i) => (
              <div key={i} className="bg-white rounded-xl p-4 sm:p-5 md:p-6 border border-[#E2E8F0]">
                <div className="flex items-start justify-between gap-3 sm:gap-4 mb-2 sm:mb-3">
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base text-[#0F172A] mb-1">{q.title}</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs">
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-[#F1F5F9] text-[#64748B]">
                        Detected: {q.detectedPattern}
                      </span>
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-[#EFF6FF] text-[#2563EB]">
                        Expected: {q.expectedPattern}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <span className="font-sora font-bold text-xl sm:text-2xl text-[#2563EB]">{q.score}</span>
                    <span className="text-xs text-[#94A3B8]">/10</span>
                  </div>
                </div>

                <div className="h-1.5 sm:h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
                    style={{ width: `${(q.score / maxPerQuestionScore) * 100}%` }}
                  />
                </div>

                {q.issues && q.issues.length > 0 && (
                  <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                    {q.issues.map((issue, idx) => (
                      <span key={idx} className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-red-50 text-red-600 text-xs font-medium">
                        {issue}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* STRENGTHS & WEAKNESSES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 opacity-0 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="bg-green-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-green-100">
            <h2 className="font-sora font-bold text-lg sm:text-xl mb-3 sm:mb-4 flex items-center gap-2 text-green-800">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Strengths
            </h2>
            <ul className="space-y-2 sm:space-y-3">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-green-700 text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 sm:mt-2 flex-shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-red-100">
            <h2 className="font-sora font-bold text-lg sm:text-xl mb-3 sm:mb-4 flex items-center gap-2 text-red-800">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Areas for Improvement
            </h2>
            <ul className="space-y-2 sm:space-y-3">
              {weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-red-700 text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 sm:mt-2 flex-shrink-0" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI INTELLIGENCE ENGINE */}
        {aiSolution && (
          <div className="bg-[#F8FAFC] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-[#E2E8F0] space-y-6 sm:space-y-8 opacity-0 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-2.5 sm:gap-3 pb-4 sm:pb-6 border-b border-[#E2E8F0]">
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-[#2563EB] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="font-sora font-bold text-xl sm:text-2xl">AI Intelligence Analysis</h2>
                <p className="text-xs sm:text-sm text-[#64748B]">Deep insights powered by machine learning</p>
              </div>
            </div>

            {/* Core Explanation */}
            <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 border border-[#E2E8F0]">
              <h3 className="font-sora font-bold text-base sm:text-lg mb-2 sm:mb-3 text-[#0F172A]">Analysis</h3>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed whitespace-pre-line">
                {aiSolution.explanation}
              </p>
            </div>

            {/* Solution */}
            {aiSolution.solution && (
              <div className="bg-[#EFF6FF] rounded-xl p-4 sm:p-5 md:p-6 border border-[#BFDBFE]">
                <h3 className="font-sora font-bold text-base sm:text-lg mb-2 sm:mb-3 text-[#2563EB]">Recommended Solution</h3>
                <div className="code-block">
                  <p className="text-sm text-[#1e40af] leading-relaxed whitespace-pre-line font-mono">
                    {aiSolution.solution}
                  </p>
                </div>
              </div>
            )}

            {/* Executive Summary */}
            {aiSolution.executiveSummary && (
              <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 border border-[#E2E8F0]">
                <h3 className="font-sora font-bold text-base sm:text-lg mb-2 sm:mb-3 text-[#0F172A]">Executive Summary</h3>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed whitespace-pre-line">
                  {aiSolution.executiveSummary}
                </p>
              </div>
            )}

            {/* Behavioral Psychology */}
            {aiSolution.behavioralPsychology && (
              <div>
                <h3 className="font-sora font-bold text-base sm:text-lg mb-3 sm:mb-4 text-[#0F172A]">Behavioral Profile</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {Object.entries(aiSolution.behavioralPsychology).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-white p-3 sm:p-4 md:p-5 rounded-xl border border-[#E2E8F0]"
                    >
                      <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-1.5 sm:mb-2">
                        {key.replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Growth Trajectory */}
            {aiSolution.growthTrajectory && (
              <div className="bg-gradient-to-r from-[#F0FDF4] to-[#ECFDF5] rounded-xl p-4 sm:p-5 md:p-6 border border-green-200">
                <h3 className="font-sora font-bold text-base sm:text-lg mb-1.5 sm:mb-2 text-green-800">Growth Trajectory</h3>
                <p className="text-sm sm:text-base text-green-700 leading-relaxed">
                  {aiSolution.growthTrajectory}
                </p>
              </div>
            )}

            {/* Advanced Hiring Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {aiSolution.percentileRanking && (
                <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl border border-[#E2E8F0] text-center">
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 sm:mb-2">Percentile</p>
                  <p className="font-sora font-bold text-2xl sm:text-3xl text-[#2563EB]">
                    {typeof aiSolution.percentileRanking === "object"
                      ? aiSolution.percentileRanking.percentile ?? 0
                      : aiSolution.percentileRanking}%
                  </p>
                </div>
              )}

              {aiSolution.hiringRiskIndex && (
                <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl border border-[#E2E8F0] text-center">
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 sm:mb-2">Risk Index</p>
                  <p className="font-sora font-bold text-2xl sm:text-3xl text-red-500">
                    {typeof aiSolution.hiringRiskIndex === "object"
                      ? aiSolution.hiringRiskIndex.riskScore ?? 0
                      : aiSolution.hiringRiskIndex}%
                  </p>
                  {typeof aiSolution.hiringRiskIndex === "object" && (
                    <p className="text-xs text-[#64748B] mt-1">
                      {aiSolution.hiringRiskIndex.classification}
                    </p>
                  )}
                </div>
              )}

              {aiSolution.leadershipReadinessScore !== undefined && (
                <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl border border-[#E2E8F0] text-center">
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 sm:mb-2">Leadership</p>
                  <p className="font-sora font-bold text-2xl sm:text-3xl text-green-500">
                    {aiSolution.leadershipReadinessScore}%
                  </p>
                </div>
              )}

              <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl border border-[#E2E8F0] text-center">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 sm:mb-2">Maturity</p>
                <p className="font-sora font-bold text-lg sm:text-xl text-[#0F172A]">
                  {finalScore >= 8 ? "Senior" : finalScore >= 6 ? "Mid" : "Entry"}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ACTIONS */}
      <div className="max-w-6xl mx-auto mt-8 sm:mt-10 md:mt-12 flex flex-wrap gap-3 sm:gap-4 justify-center opacity-0 animate-slide-up px-4 sm:px-0" style={{ animationDelay: '0.6s' }}>
        <button
          onClick={downloadPDF}
          className="px-5 sm:px-8 py-2.5 sm:py-4 bg-[#0F172A] text-white rounded-xl font-semibold hover:bg-[#1e293b] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg text-xs sm:text-sm w-full sm:w-auto"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="truncate">Download PDF</span>
        </button>

        <button
          onClick={() => navigator.clipboard.writeText(shareLink)}
          className="px-5 sm:px-8 py-2.5 sm:py-4 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-[#1d4ed8] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#2563EB]/25 text-xs sm:text-sm w-full sm:w-auto"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span className="truncate">Copy Share Link</span>
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-5 sm:px-8 py-2.5 sm:py-4 bg-[#F1F5F9] text-[#0F172A] rounded-xl font-semibold hover:bg-[#E2E8F0] transition-all duration-200 flex items-center justify-center gap-2 border border-[#E2E8F0] text-xs sm:text-sm w-full sm:w-auto"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="truncate">New Interview</span>
        </button>
      </div>

    </div>
  );
}