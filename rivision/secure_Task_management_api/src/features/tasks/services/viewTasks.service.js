import { ROLES } from "../../../data/roles.js";

import { taskRepo } from "../../../Repositores/task.repository.js";


export const viewTasksService = (user) => {

    let filteredTasks = [];

    if(user.role === ROLES.ADMIN) {
        filteredTasks = taskRepo.findAll();
    }

    else if(user.role === ROLES.MANAGER) {
        filteredTasks = taskRepo.findByManager(user);
    }   

    else if (user.role === ROLES.MEMBER) {
        filteredTasks = taskRepo.findByAssignee(user);
    }


    return {
        success : true,
        tasks : filteredTasks,
        message : "tasks fetched successfully",
    }

}