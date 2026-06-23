import { taskRepo } from "../../../Repositores/task.repository";



export const updateStatusService = (
    task, status
) => {
    const updateTask = taskRepo.update(task.id, {
        status
    });

    return {
        success : true,
        task :updateTask,
        message :" status updated sucessfully",
    };
};

