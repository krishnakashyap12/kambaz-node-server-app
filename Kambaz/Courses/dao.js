import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findAllCourses() {
  return model.find();
}

export function createCourse(course) {
  delete course._id; // MongoDB will generate _id
  // Set default image if not provided
  if (!course.image) {
    course.image = "/images/reactjs.jpg";
  }
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
}

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}