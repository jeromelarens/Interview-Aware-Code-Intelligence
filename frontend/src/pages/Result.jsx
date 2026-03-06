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
  Radar
} from "recharts";

/* ---------------- SVG RADIAL SCORE ---------------- */

const RadialScore = ({ score }) => {
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = (score / 10) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="rgba(255,255,255,0.08)"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="url(#gradient)"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${progress} ${circumference}`}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{ transition: "stroke-dasharray 1.2s ease" }}
      />
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="26"
        fontWeight="bold"
      >
        {score}
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
      <div className="h-screen flex items-center justify-center text-gray-400">
        Evaluating interview performance…
      </div>
    );

  if (error || !result)
    return (
      <div className="h-screen flex flex-col items-center justify-center text-red-400">
        <p className="mb-6">Result unavailable</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-cyan-400 text-black rounded-lg"
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
    { subject: "Logic", value: Math.round(logicScore) },
    { subject: "Trade-offs", value: Math.round(tradeOffScore) },
    { subject: "Scalability", value: Math.round(scalabilityScore) },
    { subject: "Clarity", value: Math.round(clarityScore) },
    { subject: "Consistency", value: Math.round(consistencyScore) }
  ];

  const maxPerQuestionScore = Math.max(
    ...perQuestion.map(q => q.score || 0),
    1
  );

  /* ---------------- PDF ---------------- */

  const downloadPDF = async () => {
    const element = document.getElementById("report-container");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    pdf.save("Interview_Report.pdf");
  };

  const shareLink = `${window.location.origin}/result/${sessionId}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0e14] to-[#111827] text-white px-10 py-12">
      <div id="report-container" className="space-y-14">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Interview Report</h1>
            <p className="text-gray-400 mt-1">
              AI-powered technical evaluation
            </p>
          </div>
          <RadialScore score={finalScore} />
        </div>

        {/* VERDICT */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
          <p className="text-gray-400">Final Decision</p>
          <h2 className="text-3xl font-semibold text-cyan-400 mt-2">
            {decision}
          </h2>
          <p className="mt-2 text-gray-400">
            Code Level: {codeLevel}
          </p>
        </div>

        {/* RADAR CHART */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="mb-6 text-lg">Skill Breakdown</h2>
          <RadarChart outerRadius={120} width={400} height={300} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              dataKey="value"
              stroke="#22d3ee"
              fill="#22d3ee"
              fillOpacity={0.4}
            />
          </RadarChart>
        </div>

        {/* PATTERN PERFORMANCE */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="mb-6 text-lg">Question Performance</h2>

          {perQuestion.map((q, i) => (
            <div key={i} className="mb-6">
              <p className="text-sm text-gray-400 mb-1">
                {q.title}
              </p>

              <p className="text-xs text-gray-500 mb-2">
                Pattern: {q.detectedPattern} | Expected: {q.expectedPattern}
              </p>

              <div className="h-2 bg-white/10 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                  style={{
                    width: `${(q.score / maxPerQuestionScore) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        


        {/* STRENGTHS & WEAKNESSES */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="mb-4">Strengths</h2>
            <ul className="space-y-2 text-gray-300">
              {strengths.map((s, i) => <li key={i}>• {s}</li>)}
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="mb-4">Weaknesses</h2>
            <ul className="space-y-2 text-gray-300">
              {weaknesses.map((w, i) => <li key={i}>• {w}</li>)}
            </ul>
          </div>
        </div>

        {/* AI SUGGESTION */}
        {/* AI INTELLIGENCE ENGINE */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8">

          <h2 className="text-xl font-semibold">
            AI Intelligence Analysis
          </h2>

          {/* Core Explanation */}
          <div>
            <p className="text-gray-300 whitespace-pre-line">
              {aiSolution.explanation}
            </p>

            <p className="text-cyan-400 mt-4 whitespace-pre-line">
              {aiSolution.solution}
            </p>
          </div>

          {/* Executive Summary */}
          {aiSolution.executiveSummary && (
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-sm text-gray-400 mb-3">
                Recruiter Executive Summary
              </h3>
              <p className="text-gray-300 whitespace-pre-line">
                {aiSolution.executiveSummary}
              </p>
            </div>
          )}

          {/* Behavioral Psychology */}
          {aiSolution.behavioralPsychology && (
            <div>
              <h3 className="text-sm text-gray-400 mb-3">
                Behavioral Psychology Profile
              </h3>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                {Object.entries(aiSolution.behavioralPsychology).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-white/5 p-4 rounded-lg border border-white/10"
                  >
                    <p className="text-cyan-400 capitalize mb-1">
                      {key.replace(/([A-Z])/g, " $1")}
                    </p>
                    <p className="text-gray-300">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Growth Trajectory */}
          {aiSolution.growthTrajectory && (
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-sm text-gray-400 mb-2">
                Growth Trajectory Projection
              </h3>
              <p className="text-gray-300">
                {aiSolution.growthTrajectory}
              </p>
            </div>
          )}

          {/* Advanced Hiring Metrics */}
          {/* Advanced Hiring Metrics */}
<div className="grid md:grid-cols-4 gap-6">

  {aiSolution.percentileRanking && (
    <div className="bg-white/5 p-5 rounded-xl border border-white/10 text-center">
      <p className="text-gray-400 text-sm">Percentile Ranking</p>
      <p className="text-2xl font-bold text-cyan-400 mt-2">
        {typeof aiSolution.percentileRanking === "object"
          ? aiSolution.percentileRanking.percentile ?? 0
          : aiSolution.percentileRanking}%
      </p>
    </div>
  )}

  {aiSolution.hiringRiskIndex && (
    <div className="bg-white/5 p-5 rounded-xl border border-white/10 text-center">
      <p className="text-gray-400 text-sm">Hiring Risk Index</p>
      <p className="text-2xl font-bold text-red-400 mt-2">
        {typeof aiSolution.hiringRiskIndex === "object"
          ? aiSolution.hiringRiskIndex.riskScore ?? 0
          : aiSolution.hiringRiskIndex}%
      </p>
      {typeof aiSolution.hiringRiskIndex === "object" && (
        <p className="text-xs text-gray-400 mt-1">
          {aiSolution.hiringRiskIndex.classification}
        </p>
      )}
    </div>
  )}

  {aiSolution.leadershipReadinessScore !== undefined && (
    <div className="bg-white/5 p-5 rounded-xl border border-white/10 text-center">
      <p className="text-gray-400 text-sm">Leadership Readiness</p>
      <p className="text-2xl font-bold text-green-400 mt-2">
        {aiSolution.leadershipReadinessScore}%
      </p>
    </div>
  )}

  <div className="bg-white/5 p-5 rounded-xl border border-white/10 text-center">
    <p className="text-gray-400 text-sm">Engineering Maturity</p>
    <p className="text-2xl font-bold text-purple-400 mt-2">
      {finalScore >= 8
        ? "Senior-Level"
        : finalScore >= 6
          ? "Mid-Level"
          : "Entry-Level"}
    </p>
  </div>

</div>


        </div>


      </div>

      {/* ACTIONS */}
      <div className="flex gap-6 justify-center mt-14">
        <button
          onClick={downloadPDF}
          className="px-6 py-3 bg-purple-500 rounded-xl font-semibold hover:opacity-90"
        >
          Download PDF
        </button>

        <button
          onClick={() => navigator.clipboard.writeText(shareLink)}
          className="px-6 py-3 bg-cyan-500 rounded-xl font-semibold hover:opacity-90"
        >
          Copy Share Link
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-white/10 rounded-xl font-semibold hover:bg-white/20"
        >
          New Interview
        </button>
      </div>

    </div>
  );
}
