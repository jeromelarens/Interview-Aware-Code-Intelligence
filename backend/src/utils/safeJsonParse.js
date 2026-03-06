export const safeJsonParse = (raw) => {
  if (!raw || typeof raw !== "string") {
    throw new Error("AI response is empty or not a string");
  }

  try {
    // First attempt: clean JSON
    return JSON.parse(raw);
  } catch (err) {
    // Fallback: extract JSON block
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("AI response is not valid JSON");
    }

    try {
      return JSON.parse(match[0]);
    } catch (innerErr) {
      throw new Error("Failed to parse extracted JSON");
    }
  }
};
