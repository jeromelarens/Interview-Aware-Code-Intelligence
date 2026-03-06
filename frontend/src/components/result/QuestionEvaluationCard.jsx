export default function QuestionEvaluationCard({
  question,
  evaluation
}) {
  return (
    <div className="p-6 rounded-xl bg-black/40 border border-white/10">
      <h3 className="text-sm font-medium mb-3 text-white">
        {question}
      </h3>

      <p className="text-sm text-gray-400 mb-4">
        {evaluation.interviewerReasoning}
      </p>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="text-gray-500 mb-1">Strengths</p>
          <ul className="list-disc list-inside text-gray-300">
            {evaluation.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-gray-500 mb-1">Weaknesses</p>
          <ul className="list-disc list-inside text-gray-300">
            {evaluation.weaknesses.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
