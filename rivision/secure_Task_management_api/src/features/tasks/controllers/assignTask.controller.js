import { assignTaskService } from "../services/asingTaskService.js";



export const assigntaskController = (req, res) => {
    try {
        
        const task = req.task;
        const assignedTo = req.body.assignedTo;

        const result = assignTaskService(task, assignedTo);

      if (!result.success) {
      return res.status(result.statusCode).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      task: result.task,
      message: result.message,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in assignTask controller",
      error: error.message,
    });
  }
};