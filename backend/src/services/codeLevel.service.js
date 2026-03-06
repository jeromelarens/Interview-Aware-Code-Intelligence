/**
 * codeLevel.service.js
 * --------------------
 * Senior-grade code maturity detection
 * Interviewer-style gating + weighted scoring
 */

export const detectLevel = ({ signals, strengths = [], weaknesses = [] }) => {
  let score = 0;

  /* =================================================
   * 1️⃣ HARD GATES (FAIL FAST)
   * ================================================= */

  // ❌ No complexity discussion → cannot exceed Intermediate
  const noComplexity =
    !signals.timeComplexity && !signals.spaceComplexity;

  // ❌ Pure brute force with no optimization
  const bruteOnly =
    signals.bruteForceOnly && !signals.dataStructures;

  // ❌ Copy-paste / template answers
  const copiedSolution = signals.copyPastePatterns;

  if (copiedSolution) {
    return "Beginner"; // instant fail
  }

  /* =================================================
   * 2️⃣ CORE FUNDAMENTALS (WEIGHTED)
   * ================================================= */

  if (signals.dataStructures || signals.usesMap) score += 3;
  if (signals.timeComplexity) score += 3;
  if (signals.spaceComplexity) score += 2;

  /* =================================================
   * 3️⃣ THINKING QUALITY
   * ================================================= */

  if (signals.clearStructure) score += 3;
  if (signals.tradeOffs) score += 3;
  if (signals.edgeCases) score += 2;

  /* =================================================
   * 4️⃣ PRODUCTION READINESS
   * ================================================= */

  if (signals.hasExpiryLogic) score += 2;
  if (signals.usesCleanup) score += 2;
  if (signals.scalabilityDiscussion) score += 3;

  /* =================================================
   * 5️⃣ NEGATIVE SIGNALS (OVERRIDES)
   * ================================================= */

  if (signals.nestedLoops) score -= 2;
  if (bruteOnly) score -= 4;

  // Penalize imbalance
  score -= weaknesses.length * 0.8;
  score += strengths.length * 0.4;

  /* =================================================
   * 6️⃣ CLAMP
   * ================================================= */

  score = Math.max(0, Math.min(score, 20));

  /* =================================================
   * 7️⃣ LEVEL DECISION (INTERVIEWER BARS)
   * ================================================= */

  // 🚫 Hard caps
  if (noComplexity && score >= 10) {
    return "Intermediate";
  }

  if (score >= 16) return "Senior";
  if (score >= 12) return "Advanced";
  if (score >= 7) return "Intermediate";
  return "Beginner";
};