import { viewTasksService } from "../services/viewTasks.service.js";

export const viewTaskController = (req, res) => {
  try {
    const user = req.user;

    const result = viewTasksService(user);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      tasks: result.tasks,
      message: result.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in getTasks controller",
      error: error.message,
    });
  }
};
