/**
 * codeAnalysis.service.js
 * --------------------------------
 * Professional-grade code signal analyzer
 * Interviewer-style, deterministic, explainable
 */

export const analyzeCodeSignals = (text) => {
  const t = text.toLowerCase();

  /* -----------------------------
   * 1️⃣ Data structure signals
   * ----------------------------- */
  const usesMap =
    /map|hashmap|dictionary|object lookup|key[- ]?value/.test(t);

  const usesSet =
    /set|unique collection|dedup/.test(t);

  const usesArrayOnly =
    /array|loop over array/.test(t) && !usesMap && !usesSet;

  /* -----------------------------
   * 2️⃣ Complexity awareness
   * ----------------------------- */
  const mentionsTime =
    /o\(|time complexity|linear|constant|logarithmic/.test(t);

  const mentionsSpace =
    /space complexity|memory usage|extra space/.test(t);

  const discussesTradeOffs =
    /trade[- ]?off|balance|cost of/.test(t);

  /* -----------------------------
   * 3️⃣ Expiry / lifecycle logic
   * ----------------------------- */
  const hasExpiryLogic =
    /ttl|expiry|expiration|timeout|timestamp/.test(t);

  const usesCleanup =
    /cleanup|evict|garbage|periodic|background|scheduler/.test(t);

  /* -----------------------------
   * 4️⃣ Concurrency & safety
   * ----------------------------- */
  const mentionsRaceCondition =
    /race condition|atomic|lock|mutex|synchronization/.test(t);

  /* -----------------------------
   * 5️⃣ Scalability risks
   * ----------------------------- */
  const nestedLoops =
    /(for|while).*(for|while)/s.test(t);

  const unboundedGrowth =
    /no limit|grows indefinitely|memory leak/.test(t);

  /* -----------------------------
   * 6️⃣ Edge cases & robustness
   * ----------------------------- */
  const edgeCases =
    /edge case|null|empty|zero|negative|overflow|failure/.test(t);

  /* -----------------------------
   * 7️⃣ Explanation quality
   * ----------------------------- */
  const clearStructure =
    /first|second|then|finally|step|approach/.test(t);

  /* -----------------------------
   * 8️⃣ Weighted scores (KEY UPGRADE)
   * ----------------------------- */
  let sophisticationScore = 0;

  if (usesMap) sophisticationScore += 2;
  if (usesSet) sophisticationScore += 1;
  if (mentionsTime) sophisticationScore += 1.5;
  if (mentionsSpace) sophisticationScore += 1;
  if (discussesTradeOffs) sophisticationScore += 1.5;
  if (hasExpiryLogic) sophisticationScore += 1.5;
  if (usesCleanup) sophisticationScore += 1.5;
  if (mentionsRaceCondition) sophisticationScore += 1.5;
  if (edgeCases) sophisticationScore += 1;
  if (clearStructure) sophisticationScore += 1;

  let scalabilityRisk = 0;
  if (nestedLoops) scalabilityRisk += 2;
  if (unboundedGrowth) scalabilityRisk += 2;
  if (!usesCleanup && hasExpiryLogic) scalabilityRisk += 1;

  /* -----------------------------
   * 9️⃣ Final normalized signals
   * ----------------------------- */
  return {
    // Raw detections
    usesMap,
    usesSet,
    usesArrayOnly,
    hasExpiryLogic,
    usesCleanup,
    nestedLoops,
    edgeCases,
    clearStructure,
    mentionsRaceCondition,

    // Advanced signals
    sophisticationScore: Number(sophisticationScore.toFixed(1)),
    scalabilityRisk,

    // Interviewer interpretation helpers
    seniorReady:
      sophisticationScore >= 7 && scalabilityRisk <= 1,

    fresherFriendly:
      sophisticationScore >= 4,

    weakDesign:
      sophisticationScore < 4 || scalabilityRisk >= 3
  };
};