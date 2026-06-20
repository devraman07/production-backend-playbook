import { tasks } from "../../../data/tasks.js";
import { users } from "../../../data/users.js"



export const createTaskservice = (managerId, taskData) => {
    
    const assignedUser = users.find(
        (user) => user.id === taskData.assignedTo
    );

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

    return {
        success : true,
        statuscode : 201,
        task : newTask,
        message : "task created successfully",
    }
}