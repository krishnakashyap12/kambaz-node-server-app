import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  const deleteModule = async (req, res) => {
    try {
      const { moduleId } = req.params;
      const status = await modulesDao.deleteModule(moduleId);
      res.json(status);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  const updateModule = async (req, res) => {
    try {
      const { moduleId } = req.params;
      const moduleUpdates = req.body;
      // Remove _id and editing from updates (these shouldn't be updated)
      const { _id, editing, ...updates } = moduleUpdates;
      const updatedModule = await modulesDao.updateModule(moduleId, updates);
      if (!updatedModule) {
        res.status(404).json({ message: `Module with ID ${moduleId} not found` });
        return;
      }
      res.json(updatedModule);
    } catch (error) {
      console.error("Error updating module:", error);
      res.status(500).json({ message: error.message });
    }
  };

  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}