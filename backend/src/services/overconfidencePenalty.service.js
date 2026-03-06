export const applyOverconfidencePenalty = (score, drift) =>
  drift ? score - 1.5 : score;
