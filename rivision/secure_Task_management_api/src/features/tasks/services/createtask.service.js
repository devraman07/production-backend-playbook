import { taskRepo } from "../../../Repositores/task.repository.js";
import { userrepo } from "../../../Repositores/User.repository.js";



export const createTaskservice = (managerId, taskData) => {
    
    const assignedUser = userrepo.findById(taskData.assignedTo);


    if(!assignedUser) {
        return {
            success : false,
            statusCode : 404,
            message : " user not found",
        }
    }

    const newTask = {
        id : crypto.randomUUID(),
        title : taskData.title,
        description : taskData.description,
        status : "pending",
        assignedTo : taskData.assignedTo,
        assignedBy : managerId,
        managerId : managerId
    };

    const savedTask =   taskRepo.create(newTask);

    return {
        success : true,
        statuscode : 201,
        task : savedTask,
        message : "task created successfully",
    }
}