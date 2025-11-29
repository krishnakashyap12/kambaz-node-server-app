import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  _id: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  email: String,
  dob: String,
  role: {
    type: String,
    enum: ["FACULTY", "STUDENT", "TA", "ADMIN"],
    required: true,
  },
  loginId: String,
  section: String,
  lastActivity: String,
  totalActivity: String,
}, { _id: false });

// Course Schema
const courseSchema = new mongoose.Schema({
  _id: String,
  name: { type: String, required: true },
  number: String,
  startDate: String,
  endDate: String,
  department: String,
  credits: Number,
  image: String,
  description: String,
  author: String,
}, { _id: false });

// Module Schema
const moduleSchema = new mongoose.Schema({
  _id: String,
  name: { type: String, required: true },
  description: String,
  course: { type: String, required: true },
  lessons: [{
    _id: String,
    name: String,
    description: String,
    module: String,
  }],
}, { _id: false });

// Assignment Schema
const assignmentSchema = new mongoose.Schema({
  _id: String,
  title: { type: String, required: true },
  course: { type: String, required: true },
}, { _id: false });

// Enrollment Schema
const enrollmentSchema = new mongoose.Schema({
  _id: String,
  user: { type: String, required: true },
  course: { type: String, required: true },
}, { _id: false });

// Grade Schema
const gradeSchema = new mongoose.Schema({
  _id: String,
  student: { type: String, required: true },
  assignment: { type: String, required: true },
  grade: String,
}, { _id: false });

// Create Models
export const User = mongoose.model("User", userSchema, "users");
export const Course = mongoose.model("Course", courseSchema, "courses");
export const Module = mongoose.model("Module", moduleSchema, "modules");
export const Assignment = mongoose.model("Assignment", assignmentSchema, "assignments");
export const Enrollment = mongoose.model("Enrollment", enrollmentSchema, "enrollments");
export const Grade = mongoose.model("Grade", gradeSchema, "grades");

