import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Get assignment by ID
  app.get("/api/assignments/:assignmentId", (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignment = assignmentsDao.findAssignmentById(assignmentId);
      
      if (!assignment) {
        res.status(404).json({ message: `Assignment with ID ${assignmentId} not found` });
        return;
      }
      
      res.json(assignment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update assignment
  app.put("/api/assignments/:assignmentId", (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignmentUpdates = req.body;
      const status = assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
      res.json(status);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  // Delete assignment
  app.delete("/api/assignments/:assignmentId", (req, res) => {
    try {
      const { assignmentId } = req.params;
      assignmentsDao.deleteAssignment(assignmentId);
      res.sendStatus(204);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
}