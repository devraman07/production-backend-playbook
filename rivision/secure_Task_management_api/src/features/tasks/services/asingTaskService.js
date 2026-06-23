import { userrepo } from "../../../Repositores/User.repository.js";
import { taskRepo } from "../../../Repositores/task.repository.js";

export const assignTaskService = (
  task,
  assignedTo
) => {
  const assignedUser =
    userrepo.findById(
      assignedTo
    );

  if (!assignedUser) {
    return {
      success: false,
      statusCode: 404,
      message:
        "Assigned user not found",
    };
  }

  const updatedTask =
    taskRepo.update(
      task.id,
      {
        assignedTo,
      }
    );

  return {
    success: true,
    task: updatedTask,
    message:
      "Task assigned successfully",
  };
};