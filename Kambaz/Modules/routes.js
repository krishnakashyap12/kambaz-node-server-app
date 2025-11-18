import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
  const deleteModule = async (req, res) => {
    try {
      const { moduleId } = req.params;
      modulesDao.deleteModule(moduleId);
      res.sendStatus(204);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  const updateModule = async (req, res) => {
    try {
      const { moduleId } = req.params;
      const moduleUpdates = req.body;
      const status = modulesDao.updateModule(moduleId, moduleUpdates);
      res.json(status);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  app.delete("/api/modules/:moduleId", deleteModule);
  app.put("/api/modules/:moduleId", updateModule);
}