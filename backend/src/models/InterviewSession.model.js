import mongoose from "mongoose";

const InterviewSessionSchema = new mongoose.Schema({
  interviewType: String,
  company: String,
  questions: Array,
  answers: Array,
  result: Object,
  completed: Boolean
});

export default mongoose.model(
  "InterviewSession",
  InterviewSessionSchema
);
