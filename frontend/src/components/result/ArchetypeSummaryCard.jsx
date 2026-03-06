export default function ArchetypeSummaryCard({ archetypeSummary }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      <h2 className="text-lg font-semibold mb-4">
        Solution Archetype
      </h2>

      <p className="text-sm text-gray-300 leading-relaxed">
        {archetypeSummary.insight}
      </p>
    </div>
  );
}
