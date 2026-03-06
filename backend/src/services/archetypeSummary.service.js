export const generateArchetypeSummary = (session, company) => {
  const usage = {};
  let matchCount = 0;

  session.answers.forEach(ans => {
    const used = ans.evaluation.archetype;
    const expected = ans.questionPattern;

    usage[used] = (usage[used] || 0) + 1;

    if (used === expected) {
      matchCount++;
    }
  });

  const mostUsed = Object.keys(usage).reduce((a, b) =>
    usage[a] > usage[b] ? a : b
  );

  const total = session.answers.length;
  const matchPercentage = Math.round((matchCount / total) * 100);

  let interviewerSignal =
    matchPercentage < 50
      ? "Risky for product-based roles"
      : matchPercentage < 75
      ? "Borderline pattern usage"
      : "Strong problem-solving alignment";

  if (company === "TCS" && matchPercentage < 50) {
    interviewerSignal = "Acceptable for service-based roles";
  }

  return {
    mostUsed,
    expectedDominant: "HASHMAP", // can be enhanced later
    matchPercentage,
    insight:
      matchPercentage < 50
        ? "Candidate relies heavily on brute force approaches."
        : "Candidate shows reasonable use of optimized patterns.",
    interviewerSignal
  };
};
