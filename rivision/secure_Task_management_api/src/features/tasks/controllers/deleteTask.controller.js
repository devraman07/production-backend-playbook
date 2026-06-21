import { deleteTaskService } from "../services/deleteTask.service.js";

export const deleteTaskController = (req, res) => {
  try {
    const task = req.task;

    const result = deleteTaskService(task);

    if (!result.success) {
      return res.status(result.statusCode).json({
        success: false,
        message: result.message,
      });

      return res.status(200).json({
        success: true,
        message: "task deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "task deletion failed",
    });
  }
};
