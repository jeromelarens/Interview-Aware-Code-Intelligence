export default function CandidateSummaryCard({
  codeLevel,
  finalVerdict,
  interviewerConfidence
}) {
  const decision = finalVerdict?.decision || "Unavailable";
  const score = finalVerdict?.finalScore ?? "-";
  const companyBar = finalVerdict?.companyBar || "N/A";

  return (
    <div className="p-8 rounded-xl border border-white/10 bg-white/5">
      <div className="text-xs uppercase tracking-wide text-gray-500 mb-4">
        Candidate Summary
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-400">Code Level</div>
          <div className="text-lg font-semibold">{codeLevel}</div>
        </div>

        <div>
          <div className="text-sm text-gray-400">Final Decision</div>
          <div className="text-xl font-semibold text-accent">
            {decision}
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <span>Score</span>
          <span>{score}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <span>Company Bar</span>
          <span>{companyBar}</span>
        </div>

        {interviewerConfidence && (
          <div className="pt-4 border-t border-white/10 text-xs text-gray-500">
            Confidence: {interviewerConfidence.score}
          </div>
        )}
      </div>
    </div>
  );
}
