// src/services/cheatingDetection.service.js

export const detectCheating = (text = "") => {
  if (!text) return false;

  // Very naive but deterministic
  const suspicious =
    /chatgpt|openai|as an ai|large language model/i.test(text);

  return suspicious;
};