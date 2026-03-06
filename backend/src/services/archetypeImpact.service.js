export const applyArchetypeImpact = ({
  expected,
  observed,
  evaluation,
  company
}) => {
  if (expected === observed.type) {
    evaluation.score += 1;
    evaluation.interviewerReasoning +=
      " The candidate used the expected problem-solving pattern.";
    return evaluation;
  }

  evaluation.interviewerReasoning +=
    ` The expected approach was ${expected}, but the candidate used ${observed.type}.`;

  if (company === "GOOGLE" || company === "AMAZON") {
    evaluation.score -= 2;
    evaluation.riskAssessment.level = "High";
    evaluation.riskAssessment.reason =
      "Using a suboptimal approach in a product-focused interview.";
  } else {
    evaluation.score -= 1;
    evaluation.riskAssessment.level = "Medium";
    evaluation.riskAssessment.reason =
      "Solution works but is not optimized.";
  }

  evaluation.score = Math.max(0, Math.min(10, evaluation.score));
  return evaluation;
};
