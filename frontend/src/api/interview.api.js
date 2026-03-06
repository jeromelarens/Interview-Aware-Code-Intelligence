import client from "./client";

export const startInterview = (data) =>
  client.post("/api/interview/start", data).then(r => r.data);

export const submitAnswer = (data) =>
  client
    .post("/api/interview/submit-answer", data)
    .then(r => r.data);   // 🔥 THIS WAS MISSING

export const getFinalResult = (sessionId) =>
  client.get(`/api/interview/result/${sessionId}`).then(r => r.data);
