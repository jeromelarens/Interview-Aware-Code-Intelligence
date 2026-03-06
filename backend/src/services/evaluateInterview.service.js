/**
 * evaluateInterview.service.js
 * ------------------------------------------------
 * FINAL interviewer-grade evaluation engine
 * Deterministic • Explainable • Pattern-aware
 * AI-solution integrated (enhanced dynamic mode)
 */

import { analyzeCodeSignals } from "./codeAnalysis.service.js";
import { detectArchetype } from "./archetypeDetection.service.js";
import { detectConsistency } from "./consistency.service.js";
import { detectConfidenceDrift } from "./confidenceDrift.service.js";
import { detectCheating } from "./cheatingDetection.service.js";
import { getFinalVerdict } from "./finalVerdict.service.js";
import { generateSolution } from "./aiSolution.service.js";

/**
 * Interviewer expectation map
 */
const EXPECTED_PATTERNS = {
  "In-Memory Cache with Expiry": "HASHMAP",
  "Race-Condition Safe Counter": "ATOMIC",
  "Efficient Pagination Engine": "CURSOR",
  "Scalable Comment System": "TREE",
  "Interview Evaluation Engine": "RULE_ENGINE",

  "Palindrome String Check": "TWO_POINTER",
  "Second Largest Element in Array": "LINEAR_SCAN",
  "Character Frequency Count": "HASHMAP",
  "Prime Number Validation": "MATH_OPT",
  "Reverse Words in Sentence": "STRING"
};

const generateLiveFollowUps = ({ expected, archetype, signals, interviewType }) => {
  const q = [];

  if (expected && archetype !== expected)
    q.push(`Why is ${expected} better than ${archetype} here?`);

  if (!signals.edgeCases)
    q.push("What edge cases would break this solution?");

  if (!signals.usesCleanup && interviewType === "product")
    q.push("How would you design cleanup at scale?");

  if (signals.nestedLoops)
    q.push("Can you optimize this to avoid nested loops?");

  if (!signals.tradeOffs)
    q.push("Explain time vs space trade-offs.");

  return q;
};

export const evaluateInterview = async (session) => {
  const answers = session.answers || [];
  const questions = session.questions || [];
  const interviewType = session.interviewType;

  const strengths = [];
  const weaknesses = [];
  const perQuestion = [];
  const followUpQuestions = [];

  let totalScore = 0;
  let reusedAnswerCount = 0;

  const normalizedAnswers = new Set();
  const archetypeUsage = {};

  /* ------------------------------------------------
   1️⃣ PER-QUESTION EVALUATION
  ------------------------------------------------ */

  answers.forEach((ans, index) => {
    const text = ans.answer.trim();
    const normalized = text.replace(/\s+/g, "").toLowerCase();
    const title = questions[index]?.title || "Unknown";
    const expected = EXPECTED_PATTERNS[title];

    if (normalizedAnswers.has(normalized)) reusedAnswerCount++;
    normalizedAnswers.add(normalized);

    const signals = analyzeCodeSignals(text);
    const archetype = detectArchetype(text);

    archetypeUsage[archetype.type] =
      (archetypeUsage[archetype.type] || 0) + 1;

    let score = 0;
    const issues = [];

    if (text.length > 350) score += 2.5;
    else if (text.length > 200) score += 2.0;
    else if (text.length > 120) score += 1.4;
    else score += 0.6;

    if (signals.tradeOffs) score += 1.2;
    else issues.push("Trade-offs not discussed");

    if (expected && archetype.type === expected) {
      score += 2.0;
      strengths.push(`Correct ${expected} pattern used for "${title}"`);
    } else if (expected) {
      score -= 1.2;
      weaknesses.push(
        `Pattern mismatch in "${title}" (expected ${expected}, used ${archetype.type})`
      );
    }

    if (!signals.edgeCases) issues.push("Edge cases missing");
    if (!signals.usesCleanup) issues.push("No cleanup strategy");
    if (signals.nestedLoops) issues.push("Scalability risk");

    if (issues.length >= 2) score -= 0.8;

    followUpQuestions.push(
      ...generateLiveFollowUps({
        expected,
        archetype: archetype.type,
        signals,
        interviewType
      })
    );

    perQuestion.push({
      questionId: index + 1,
      title,
      expectedPattern: expected || "N/A",
      detectedPattern: archetype.type,
      score: Number(score.toFixed(1)),
      issues
    });

    totalScore += score;
  });

  /* ------------------------------------------------
   2️⃣ AGGREGATE THINKING
  ------------------------------------------------ */

  const dominantArchetype = Object.keys(archetypeUsage).sort(
    (a, b) => archetypeUsage[b] - archetypeUsage[a]
  )[0];

  if (Object.keys(archetypeUsage).length === 1 && answers.length >= 3) {
    weaknesses.push(`Over-reliance on ${dominantArchetype} pattern`);
    totalScore -= 1.5;
  } else {
    strengths.push("Adapts approach across different problems");
  }

  /* ------------------------------------------------
   3️⃣ GLOBAL PENALTIES
  ------------------------------------------------ */

  if (reusedAnswerCount > 0) {
    weaknesses.push("Same explanation reused across questions");
    totalScore -= reusedAnswerCount * 1.5;
  }

  /* ------------------------------------------------
   4️⃣ SCORE NORMALIZATION
  ------------------------------------------------ */

// safety guard
const totalQuestions = answers.length || 1;

// average raw per-question score
const avgRawScore = totalScore / totalQuestions;

// theoretical max per question (based on your scoring logic)
const theoreticalMaxPerQuestion = 6;

// normalize to 0–1 range
let performanceRatio = avgRawScore / theoreticalMaxPerQuestion;

// clamp
performanceRatio = Math.max(0, Math.min(1, performanceRatio));

// apply nonlinear curve (slightly liberal)
const curvedScore = Math.pow(performanceRatio, 0.85);

// simulated percentile distribution
let percentile;

if (curvedScore < 0.3) percentile = 25;
else if (curvedScore < 0.5) percentile = 45;
else if (curvedScore < 0.65) percentile = 65;
else if (curvedScore < 0.8) percentile = 80;
else percentile = 95;

// map percentile to 10-scale
let finalScore = Number((percentile / 10).toFixed(1));

// soften brute-force penalty
if (interviewType === "product" && dominantArchetype === "BRUTE_FORCE")
  finalScore -= 0.5;

// final clamp
finalScore = Math.max(0, Math.min(10, finalScore));


  /* ------------------------------------------------
   5️⃣ TRUST SIGNALS
  ------------------------------------------------ */

  const consistency = detectConsistency(answers);
  const confidenceDrift = detectConfidenceDrift(answers);
  const cheatingSuspected =
    detectCheating(answers.map(a => a.answer).join("\n")) ||
    reusedAnswerCount >= 2;

  /* ------------------------------------------------
   6️⃣ INTERVIEWER NOTE
  ------------------------------------------------ */

  let interviewerNote;
  if (finalScore >= 8)
    interviewerNote =
      "Candidate consistently selects optimal patterns and demonstrates production-level reasoning.";
  else if (finalScore >= 6)
    interviewerNote =
      "Candidate shows solid fundamentals but occasionally falls back to suboptimal patterns.";
  else
    interviewerNote =
      "Candidate relies on generic or brute-force approaches and struggles to adapt solutions.";

  /* ------------------------------------------------
   7️⃣ 🔥 ENHANCED AI SOLUTION (FIXED SECTION)
  ------------------------------------------------ */

  let aiSolution = null;

  try {
    const weakQuestion =
      questions.find(q =>
        weaknesses.some(w => w.includes(q.title))
      ) || questions[0];

    aiSolution = await generateSolution({
      question: weakQuestion.text,
      weaknesses,
      perQuestion,
      dominantArchetype,
      finalScore,
      interviewType,
      interviewerConfidence: {
        score: Math.min(95, Math.round(finalScore * 10))
      },
      trustSignals: {
        consistency,
        confidenceDrift,
        cheatingSuspected
      }
    });

  } catch (err) {
    aiSolution = {
      explanation:
        "A stronger answer would clearly justify complexity, discuss edge cases, and explain trade-offs.",
      solution:
        "Choose the optimal data structure, explain scalability decisions, and include cleanup strategies."
    };
  }

  /* ------------------------------------------------
   8️⃣ FINAL VERDICT
  ------------------------------------------------ */

  const finalVerdict = getFinalVerdict({
    finalScore,
    interviewType,
    consistency,
    confidenceDrift,
    cheatingSuspected
  });

  /* ------------------------------------------------
   9️⃣ FINAL RESPONSE
  ------------------------------------------------ */

  return {
    codeLevel:
      finalScore >= 8
        ? "Advanced"
        : finalScore >= 6
        ? "Intermediate"
        : "Beginner",

    finalVerdict,

    interviewerConfidence: {
      score: Math.min(95, Math.round(finalScore * 10)),
      interpretation:
        finalScore >= 8
          ? "High confidence"
          : finalScore >= 6
          ? "Moderate confidence"
          : "Low confidence"
    },

    trustSignals: {
      consistency,
      confidenceDrift,
      cheatingSuspected
    },

    dominantArchetype,
    perQuestion,

    strengths: [...new Set(strengths)],
    weaknesses: [...new Set(weaknesses)],

    interviewerNote,
    aiSolution,
    followUpQuestions: [...new Set(followUpQuestions)]
  };
};
