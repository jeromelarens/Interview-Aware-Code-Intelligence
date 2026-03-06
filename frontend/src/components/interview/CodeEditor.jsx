export default function CodeEditor({ value, onChange }) {
  return (
    <div className="space-y-3">
      <label className="block text-xs uppercase tracking-wide text-gray-400">
        Solution Code
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write or paste your solution code here..."
        className="w-full h-72 p-4 rounded-lg
                   bg-black/50 border border-white/15
                   text-sm text-gray-200
                   font-mono
                   focus:outline-none focus:border-accent"
      />
    </div>
  );
}
