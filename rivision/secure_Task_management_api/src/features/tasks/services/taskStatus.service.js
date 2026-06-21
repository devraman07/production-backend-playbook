


export const updateStatusService = (
    task, status
) => {
    task.status = status;

    return {
        success : true,
        task : task,
        message :" status updated sucessfully",
    };
};

