import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  _id: String,
  name: String,
  number: String,
  credits: Number,
  description: String,
  image: String,
  startDate: String,
  endDate: String,
}, { collection: "courses" });

export default courseSchema;

