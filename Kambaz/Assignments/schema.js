import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  _id: String,
  title: { type: String, required: true },
  course: { type: String, ref: "CourseModel" },
  description: String,
  points: Number,
  group: String,
  gradeAs: String,
  submissionType: String,
  dueDate: String,
  availableFrom: String,
  availableUntil: String,
  // Also support the old field names for backward compatibility
  availableFromDate: String,
  availableUntilDate: String,
}, { collection: "assignments" });

export default assignmentSchema;

