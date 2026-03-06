import { analyzeCodeSignals } from "./codeAnalysis.service.js";
import { detectArchetype } from "./archetypeDetection.service.js";

export const generateFollowUps = (answerText, interviewType) => {
  const followUps = [];

  const signals = analyzeCodeSignals(answerText);
  const archetype = detectArchetype(answerText);

  // Depth check
  if (answerText.length < 180) {
    followUps.push("Explain your approach step-by-step with deeper reasoning.");
  }

  // Edge case pressure
  if (!signals.edgeCases) {
    followUps.push("What edge cases would break this solution?");
  }

  // Trade-offs pressure
  if (!signals.tradeOffs) {
    followUps.push("What are the time and space trade-offs?");
  }

  // Scalability pressure
  if (signals.nestedLoops) {
    followUps.push("How would you optimize this to avoid scalability issues?");
  }

  // Pattern challenge
  if (archetype.type === "BRUTE_FORCE") {
    followUps.push("Can you redesign this using a more optimal pattern?");
  }

  // Product interview pressure
  if (interviewType === "product") {
    followUps.push("How would this behave under production-scale load?");
  }

  // Always push thinking depth
  followUps.push("Why did you choose this approach over alternatives?");

  return followUps.slice(0, 5);
};
