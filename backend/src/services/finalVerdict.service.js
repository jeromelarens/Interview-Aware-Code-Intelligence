/**
 * finalVerdict.service.js
 * -----------------------
 * Final hiring decision engine
 * Deterministic • Interviewer-style
 */

import { detectConsistency } from "./consistency.service.js";

/**
 * Decide hire / borderline / no-hire
 */
export const getFinalVerdict = ({
  finalScore,
  interviewType,
  consistency,
  confidenceDrift,
  cheatingSuspected
}) => {
  let decision = "No Hire";

  /* -----------------------------
   * Base score decision
   * ----------------------------- */
  if (finalScore >= 8) {
    decision = "Hire";
  } else if (finalScore >= 6) {
    decision = "Borderline";
  }

  /* -----------------------------
   * Product vs Service tuning
   * ----------------------------- */
  if (interviewType === "product") {
    // stricter bar
    if (finalScore < 6.5) decision = "No Hire";
  } else {
    // service companies allow more leniency
    if (finalScore >= 7) decision = "Hire";
  }

  /* -----------------------------
   * Trust-based downgrades
   * ----------------------------- */
  if (!consistency && decision === "Hire") {
    decision = "Borderline";
  }

  if (confidenceDrift && decision === "Hire") {
    decision = "Borderline";
  }

  if (cheatingSuspected) {
    decision = "No Hire";
  }

  /* -----------------------------
   * Company bar label
   * ----------------------------- */
  const companyBar =
    interviewType === "product" ? "PRODUCT" : "SERVICE";

  return {
    decision,
    finalScore,
    companyBar
  };
};