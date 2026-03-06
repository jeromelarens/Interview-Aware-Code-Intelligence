export default function FinalVerdictCard({ finalVerdict }) {
  return (
    <div className="p-8 rounded-2xl
                    bg-gradient-to-br from-white/10 to-transparent
                    border border-white/15">
      <h2 className="text-xl font-semibold mb-4">
        Final Hiring Decision
      </h2>

      <p className="text-3xl font-bold text-accent mb-4">
        {finalVerdict.decision}
      </p>

      <p className="text-sm text-gray-400 leading-relaxed">
        {finalVerdict.reason}
      </p>
    </div>
  );
}
