// src/services/archetypeDetection.service.js

/**
 * Detect dominant solution archetype from candidate answer
 * Interviewer-grade heuristic (deterministic)
 */

const buildArchetype = (type, confidence) => ({
  type,
  confidence
});

export const detectArchetype = (code = "") => {
  const text = code.toLowerCase();

  const signals = {
    nestedLoops: /for\s*\(.*\)\s*{[^}]*for\s*\(/s.test(text),
    hashmap: /map|hashmap|object|\{\}/.test(text),
    twoPointer: /left\s*\+\+|right\s*--|i\s*<\s*j/.test(text),
    slidingWindow: /window|start\s*\+\+|end\s*\+\+/.test(text),
    recursion: /function\s+\w+.*\{[^}]*\w+\(.*\)/s.test(text),
    dp: /dp\[|memo|dynamic programming/.test(text),
    binarySearch: /low\s*<=\s*high|binary search/.test(text)
  };

  if (signals.slidingWindow)
    return buildArchetype("SLIDING_WINDOW", 0.85);

  if (signals.twoPointer)
    return buildArchetype("TWO_POINTER", 0.8);

  if (signals.hashmap)
    return buildArchetype("HASHMAP", 0.75);

  if (signals.binarySearch)
    return buildArchetype("BINARY_SEARCH", 0.8);

  if (signals.dp)
    return buildArchetype("DYNAMIC_PROGRAMMING", 0.9);

  if (signals.recursion)
    return buildArchetype("RECURSION", 0.7);

  if (signals.nestedLoops)
    return buildArchetype("BRUTE_FORCE", 0.6);

  return buildArchetype("BRUTE_FORCE", 0.4);
};