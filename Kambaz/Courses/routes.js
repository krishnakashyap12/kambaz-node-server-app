import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  // Find all courses
  const findAllCourses = async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // Create course
  const createCourse = async (req, res) => {
    try {
      const course = await dao.createCourse(req.body);
      const currentUser = req.session["currentUser"];
      if (currentUser) {
        await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
      }
      res.json(course);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // Delete course
  const deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const status = await dao.deleteCourse(courseId);
      res.json(status);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // Update course
  const updateCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const courseUpdates = req.body;
      const status = await dao.updateCourse(courseId, courseUpdates);
      res.json(status);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // Find modules for course
  const findModulesForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      console.log("Finding modules for course:", courseId);
      const modules = await modulesDao.findModulesForCourse(courseId);
      console.log("Found modules:", modules.length, modules);
      res.json(modules);
    } catch (err) {
      console.error("Error in findModulesForCourse:", err);
      res.status(500).json({ message: err.message });
    }
  };

  // Create module for course
  const createModuleForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      console.log("Creating module for course:", courseId);
      console.log("Module data received:", req.body);
      const module = {
        ...req.body,
        course: courseId,
      };
      console.log("Module object to create:", module);
      const newModule = await modulesDao.createModule(module);
      console.log("Module created successfully:", newModule);
      res.json(newModule);
    } catch (err) {
      console.error("Error in createModuleForCourse:", err);
      console.error("Error stack:", err.stack);
      res.status(500).json({ message: err.message || "Internal server error" });
    }
  };

  // Find assignments for course
  const findAssignmentsForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (err) {
      console.error("Error in findAssignmentsForCourse:", err);
      res.status(500).json({ message: err.message || "Internal server error" });
    }
  };

  // Create assignment for course
  const createAssignmentForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      console.log("Received assignment data:", req.body);
      const assignment = {
        ...req.body,
        course: courseId,
      };
      console.log("Assignment object to create:", JSON.stringify(assignment, null, 2));
      const newAssignment = await assignmentsDao.createAssignment(assignment);
      console.log("Created assignment successfully:", JSON.stringify(newAssignment, null, 2));
      res.json(newAssignment);
    } catch (err) {
      console.error("Error in createAssignmentForCourse:", err);
      console.error("Error stack:", err.stack);
      if (err.errors) {
        console.error("Validation errors:", JSON.stringify(err.errors, null, 2));
      }
      res.status(500).json({ 
        message: err.message || "Internal server error",
        error: err.toString(),
        errors: err.errors || undefined,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
    }
  };

  // Find users for course
  const findUsersForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const users = await enrollmentsDao.findUsersForCourse(courseId);
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // Routes
  app.get("/api/courses", findAllCourses);
  app.post("/api/courses", createCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.get("/api/courses/:courseId/users", findUsersForCourse);
}