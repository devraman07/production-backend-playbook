import { users } from "../../../data/users.js"

export const updatetaskservice = (
    task , updateData
) => {
    const userAssignedTo = users.find((user) => user.id === updateData.assignedTo);

    if(!userAssignedTo) {
        return {
            success : false,
            statuscode : 404,
            message : "user not found",
        };
        task.assignedTo = updateData.assignedTo;
    }
    
    if(updateData.title) {
        task.title = updateData.title;
    }

    if(updateData.description) {
        task.description = updateData.description
    };

    return {
        success : true,
        task : task,
        message : "task updated successfully"
    }

}