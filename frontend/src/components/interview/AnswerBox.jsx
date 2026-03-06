export default function AnswerBox({ value, onChange }) {
  return (
    <div className="space-y-3">
      <label className="block text-xs uppercase tracking-wide text-gray-400">
        Your Explanation
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Explain your approach, reasoning, and trade-offs..."
        className="w-full h-40 p-4 rounded-lg
                   bg-black/50 border border-white/15
                   text-sm text-gray-200
                   focus:outline-none focus:border-accent"
      />
    </div>
  );
}
