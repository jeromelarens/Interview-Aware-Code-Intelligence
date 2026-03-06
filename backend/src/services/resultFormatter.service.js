export const formatFinalResult = ({
  session,
  finalVerdictResult,
  company,
  archetypeSummary
}) => {
  return {
    candidateSummary: {
      codeLevel: session.codeLevel,
      overallVerdict: finalVerdictResult.decision,
      finalScore: finalVerdictResult.finalScore
    },

    questionWiseEvaluation: session.answers.map(ans => ({
      questionId: ans.questionId,
      question: ans.question,

      evaluation: {
        score: ans.evaluation.score,
        verdict: ans.evaluation.verdict,
        confidence: ans.evaluation.confidence,

        strengths: ans.evaluation.strengths,
        weaknesses: ans.evaluation.weaknesses,

        archetypeUsed: ans.evaluation.archetype,
        expectedArchetype: ans.evaluation.expectedArchetype,

        interviewerReasoning: ans.evaluation.interviewerReasoning,

        riskAssessment: ans.evaluation.riskAssessment || {
          level: "Low",
          reason: "No major risks detected"
        },

        interviewerNote: ans.evaluation.interviewerNote
      },

      aiSolution: ans.aiSolution
    })),

    archetypeSummary,

    overallEvaluation: {
      finalVerdict: {
        decision: finalVerdictResult.decision,
        finalScore: finalVerdictResult.finalScore,
        companyBar: company
      },

      interviewerConfidence: {
        score: finalVerdictResult.confidence,
        interpretation:
          finalVerdictResult.confidence > 70
            ? "High confidence in evaluation"
            : "Moderate confidence in evaluation"
      },

      trustSignals: {
        consistency: finalVerdictResult.consistency,
        confidenceDrift: finalVerdictResult.confidenceDrift,
        cheatingSuspected: finalVerdictResult.cheatingSuspected
      },

      strengths: finalVerdictResult.strengths,
      weaknesses: finalVerdictResult.weaknesses,

      interviewerSummary:
        finalVerdictResult.summary ||
        "Candidate demonstrated mixed performance across questions.",

      hiringRecommendation:
        finalVerdictResult.decision === "Hire"
          ? "Proceed with offer"
          : finalVerdictResult.decision === "Borderline"
          ? "Proceed with caution or further rounds"
          : "Do not proceed"
    }
  };
};
