import mongoose from "mongoose";

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
    enum: ["STUDENT", "FACULTY", "ADMIN", "TA", "USER"],
    default: "USER",
  },
  loginId: String,
  section: String,
  lastActivity: String,
  totalActivity: String,
}, { collection: "users" });

export default userSchema;

