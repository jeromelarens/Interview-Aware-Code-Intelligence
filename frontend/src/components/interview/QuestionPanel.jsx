export default function QuestionPanel({ question, index, total }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      <div className="mb-3 flex justify-between text-xs text-gray-400">
        <span>Question {index + 1} / {total}</span>
        <span>Live Evaluation</span>
      </div>

      <p className="text-base leading-relaxed text-white">
        {question}
      </p>
    </div>
  );
}
