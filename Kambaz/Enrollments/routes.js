import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  // Get all enrollments for a user
  app.get("/api/users/:userId/enrollments", async (req, res) => {
    const { userId } = req.params;
    try {
      const enrollments = await enrollmentsDao.findEnrollmentsForUser(userId);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ message: "Error fetching enrollments" });
    }
  });

  // Get all enrollments for a course
  app.get("/api/enrollments/course/:courseId", async (req, res) => {
    const { courseId } = req.params;
    try {
      const enrollments = await enrollmentsDao.findEnrollmentsForCourse(courseId);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching course enrollments:", error);
      res.status(500).json({ message: "Error fetching course enrollments" });
    }
  });

  // Enroll a user in a course
  app.post("/api/enrollments", async (req, res) => {
    const { user, course } = req.body;
    try {
      const enrollment = await enrollmentsDao.enrollUserInCourse(user, course);
      res.json(enrollment);
    } catch (error) {
      console.error("Error enrolling user:", error);
      res.status(500).json({ message: "Error enrolling user" });
    }
  });

  // Unenroll a user from a course
  app.delete("/api/enrollments/user/:userId/course/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    try {
      await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error unenrolling user:", error);
      res.status(500).json({ message: "Error unenrolling user" });
    }
  });
}