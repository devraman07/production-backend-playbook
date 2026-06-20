import { ROLES } from "../../../data/roles.js";
import { tasks } from "../../../data/tasks.js";


export const viewTasksService = (user) => {

    let filteredTasks = [];

    if(user.role === ROLES.ADMIN) {
        filteredTasks = tasks;
    }

    else if(user.role === ROLES.MANAGER) {
        filteredTasks = tasks.filter((task) => task.managerId === user.id);
    }   

    else if (user.role === ROLES.MEMBER) {
        filteredTasks = tasks.filter((task) => task.assignedTo === user.id);
    }


    return {
        success : true,
        tasks : filteredTasks,
        message : "tasks fetched successfully",
    }

}