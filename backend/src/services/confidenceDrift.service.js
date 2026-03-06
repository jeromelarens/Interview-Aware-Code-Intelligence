// src/services/confidenceDrift.service.js

export const detectConfidenceDrift = (answers = []) => {
  if (answers.length < 3) return false;

  const first = answers.slice(0, 2).map(a => a.answer.length);
  const last = answers.slice(-2).map(a => a.answer.length);

  const avgFirst =
    first.reduce((a, b) => a + b, 0) / first.length;
  const avgLast =
    last.reduce((a, b) => a + b, 0) / last.length;

  return avgLast < avgFirst * 0.6;
};