import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findModulesForCourse(courseId) {
  try {
    console.log("DAO: Finding modules for course:", courseId);
    const result = model.find({ course: courseId });
    console.log("DAO: Query initiated for modules");
    return result;
  } catch (error) {
    console.error("Error in findModulesForCourse DAO:", error);
    throw error;
  }
}

export function createModule(module) {
  try {
    // Create a copy to avoid mutating the original
    const moduleCopy = { ...module };
    delete moduleCopy._id; // MongoDB will generate _id
    const newModule = { ...moduleCopy, _id: uuidv4() };
    console.log("DAO: Creating module with data:", newModule);
    console.log("DAO: Model exists?", !!model);
    const result = model.create(newModule);
    console.log("DAO: Create operation initiated");
    return result;
  } catch (error) {
    console.error("Error in createModule DAO:", error);
    console.error("Error details:", {
      message: error.message,
      name: error.name,
      errors: error.errors,
      stack: error.stack
    });
    throw error;
  }
}

export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId });
}

export function updateModule(moduleId, moduleUpdates) {
  return model.findOneAndUpdate(
    { _id: moduleId },
    { $set: moduleUpdates },
    { new: true } // Return the updated document
  );
}