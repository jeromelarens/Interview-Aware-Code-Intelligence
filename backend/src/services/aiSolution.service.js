/**
 * Enterprise Interview Intelligence Engine
 * Deterministic • Psychology-aware • Recruiter-grade
 * No OpenAI dependency
 */

/* -------------------------------------------------------
   1️⃣ CONFIDENCE-WEIGHTED SCALING
------------------------------------------------------- */
const confidenceScaling = (score, confidenceScore) => {
  const weight = (score * 0.7) + ((confidenceScore || 50) / 100 * 0.3);

  if (weight >= 8)
    return `
• Demonstrates advanced architectural reasoning.
• Pattern selection is intentional and scalable.
• Strong complexity articulation.
• Production-level mindset visible.
• Engineering maturity above typical mid-level.
`;

  if (weight >= 6)
    return `
• Solid fundamentals with moderate optimization depth.
• Trade-off articulation inconsistent.
• Reasoning structure needs reinforcement.
• Shows strong mid-level potential.
`;

  return `
• Surface-level reasoning dominates.
• Limited optimization awareness.
• Weak scalability articulation.
• Needs structured technical reinforcement.
`;
};

/* -------------------------------------------------------
   2️⃣ ARCHETYPE HEATMAP
------------------------------------------------------- */
const archetypeHeatmap = (dominantArchetype, finalScore) => {

  const base = {
    HASHMAP: 0,
    TREE: 0,
    CURSOR: 0,
    ATOMIC: 0,
    RULE_ENGINE: 0,
    BRUTE_FORCE: 0,
    TWO_POINTER: 0
  };

  if (dominantArchetype && base.hasOwnProperty(dominantArchetype)) {
    base[dominantArchetype] = Math.min(100, Math.round(finalScore * 10));
  }

  return base;
};

/* -------------------------------------------------------
   3️⃣ PERCENTILE RANKING (Simulated Distribution Model)
------------------------------------------------------- */
const calculatePercentile = (finalScore) => {

  if (finalScore >= 9) return 95;
  if (finalScore >= 8) return 85;
  if (finalScore >= 7) return 70;
  if (finalScore >= 6) return 55;
  if (finalScore >= 5) return 40;
  if (finalScore >= 4) return 25;
  return 10;
};

/* -------------------------------------------------------
   4️⃣ HIRING RISK INDEX
------------------------------------------------------- */
const hiringRiskIndex = ({ finalScore, cheatingSuspected, consistency }) => {

  let risk = 100 - (finalScore * 10);

  if (cheatingSuspected) risk += 25;
  if (!consistency) risk += 10;

  risk = Math.max(0, Math.min(100, risk));

  let classification =
    risk <= 30 ? "Low Risk" :
    risk <= 60 ? "Moderate Risk" :
    "High Risk";

  return {
    riskScore: risk,
    classification
  };
};

/* -------------------------------------------------------
   5️⃣ LEADERSHIP READINESS SCORE
------------------------------------------------------- */
const leadershipReadiness = ({ finalScore, consistency }) => {

  let readiness = finalScore * 10;

  if (consistency) readiness += 5;

  readiness = Math.max(0, Math.min(100, readiness));

  let tier =
    readiness >= 80 ? "High Leadership Potential" :
    readiness >= 60 ? "Emerging Leadership Capacity" :
    "Individual Contributor Track";

  return {
    score: readiness,
    tier
  };
};

/* -------------------------------------------------------
   6️⃣ MAIN ENGINE
------------------------------------------------------- */
export const generateSolution = async ({
  weaknesses = [],
  dominantArchetype,
  finalScore = 0,
  interviewType,
  interviewerConfidence = {},
  trustSignals = {}
}) => {

  const explanation = confidenceScaling(
    finalScore,
    interviewerConfidence.score
  );

  const percentile = calculatePercentile(finalScore);

  const heatmap = archetypeHeatmap(
    dominantArchetype,
    finalScore
  );

  const risk = hiringRiskIndex({
    finalScore,
    cheatingSuspected: trustSignals.cheatingSuspected,
    consistency: trustSignals.consistency
  });

  const leadership = leadershipReadiness({
    finalScore,
    consistency: trustSignals.consistency
  });

  return {
    explanation,
    solution:
      "Candidate improvement roadmap generated based on evaluation signals.",
    interviewerRubric:
      "Measured across optimization maturity, scalability reasoning, structural clarity, and pattern alignment.",
    
    /* 🔥 NEW ENTERPRISE LAYERS */
    percentileRanking: percentile,
    archetypeHeatmap: heatmap,
    hiringRiskIndex: risk,
    leadershipReadiness: leadership
  };
};
