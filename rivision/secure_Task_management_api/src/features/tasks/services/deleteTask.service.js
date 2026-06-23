import { taskRepo } from "../../../Repositores/task.repository.js";

export const deleteTaskService = (
  task
) => {
  taskRepo.delete(task.id);

  return {
    success: true,
    message:
      "Task deleted successfully",
  };
};