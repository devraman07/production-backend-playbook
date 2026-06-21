
import { updateStatusService } from "../services/taskStatus.service.js";

export const taskStatusController = (req, res) => {
  try {
    const task = req.task;

    const status = req.body.status;

    const result = updateStatusService(task, status);

    return res.status(200).json({
      success: true,
      task: result.task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in updateTaskStatus controller",
      error: error.message,
    });
  }
};
