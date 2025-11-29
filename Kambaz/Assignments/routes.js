import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Get assignment by ID
  app.get("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignment = await assignmentsDao.findAssignmentById(assignmentId);
      
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
  app.put("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignmentUpdates = req.body;
      console.log("Updating assignment:", assignmentId, "with data:", assignmentUpdates);
      const updatedAssignment = await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
      if (!updatedAssignment) {
        res.status(404).json({ message: `Assignment with ID ${assignmentId} not found` });
        return;
      }
      console.log("Assignment updated successfully:", updatedAssignment);
      res.json(updatedAssignment);
    } catch (error) {
      console.error("Error updating assignment:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Delete assignment
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      await assignmentsDao.deleteAssignment(assignmentId);
      res.sendStatus(204);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
}