import { taskRepo } from "../../../Repositores/task.repository.js";
import { userrepo } from "../../../Repositores/User.repository.js";

export const updatetaskservice = (
  task,
  updateData
) => {
  if (updateData.assignedTo) {
    const userAssignedTo =
      userrepo.findById(
        updateData.assignedTo
      );

    if (!userAssignedTo) {
      return {
        success: false,
        statusCode: 404,
        message: "User not found",
      };
    }
  }

  const updatedTask =
    taskRepo.update(
      task.id,
      updateData
    );

  return {
    success: true,
    task: updatedTask,
    message:
      "Task updated successfully",
  };
};