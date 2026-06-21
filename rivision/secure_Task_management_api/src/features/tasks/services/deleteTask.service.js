import { tasks } from "../../../data/tasks.js"


export const deleteTaskService = (task) => {
    const taskIdx = tasks.findIndex((
        t
    )=> {
        t.id === task.id
    });

    if(!taskIdx) {
        return {
            success : false,
            statusCode : 404,
            message : "task not found",
        }
    }

    tasks.splice(taskIdx, 1);

    return {
        success : true,
        message : "task deleted success fully"
    };
}