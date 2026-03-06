// src/services/consistency.service.js

export const detectConsistency = (answers = []) => {
  if (answers.length < 2) return true;

  const lengths = answers.map(a => a.answer.length);
  const max = Math.max(...lengths);
  const min = Math.min(...lengths);

  // Large variance = inconsistency
  return max - min < 300;
};