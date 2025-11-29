import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findAssignmentsForCourse(courseId) {
  try {
    return model.find({ course: courseId });
  } catch (error) {
    console.error("Error in findAssignmentsForCourse DAO:", error);
    throw error;
  }
}

export function createAssignment(assignment) {
  try {
    // Create a copy to avoid mutating the original
    const assignmentCopy = { ...assignment };
    // Remove _id if it exists (we'll generate a new one)
    if (assignmentCopy._id) {
      delete assignmentCopy._id;
    }
    const newAssignment = { ...assignmentCopy, _id: uuidv4() };
    console.log("DAO: Creating assignment with data:", JSON.stringify(newAssignment, null, 2));
    console.log("DAO: Model exists?", !!model);
    console.log("DAO: Model name:", model?.modelName);
    const result = model.create(newAssignment);
    console.log("DAO: Create promise created");
    return result;
  } catch (error) {
    console.error("Error in createAssignment DAO:", error);
    console.error("Error details:", {
      message: error.message,
      name: error.name,
      errors: error.errors,
      stack: error.stack
    });
    if (error.errors) {
      console.error("Validation errors:", JSON.stringify(error.errors, null, 2));
    }
    throw error;
  }
}

export function deleteAssignment(assignmentId) {
  return model.deleteOne({ _id: assignmentId });
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  return model.findOneAndUpdate(
    { _id: assignmentId },
    { $set: assignmentUpdates },
    { new: true } // Return the updated document
  );
}

export function findAssignmentById(assignmentId) {
  return model.findById(assignmentId);
}