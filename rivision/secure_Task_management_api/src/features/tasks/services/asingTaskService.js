import { users } from "../../../data/users.js"

export const assignTaskService = (
    task , assignedTo
) => {
    const assignedUser = users.find(
        (user) => user.id === assignedTo
    );

    if(!assignedUser) {
        return {
            success : false,
            statusCode : 404,
            message : "Assigned user not found",
        };
    }

    task.assignedTo = assignedTo;

    return {
        success : true,
        task : task,
        message : "task assigned succesfully",
    };
};