import { createTaskservice } from "../services/createtask.service.js";

export const createtaskController = (req, res) => {
  try {
    const managerId = req.user.id;
    const taskData = req.body;

    const result = createTaskservice(managerId, taskData);

    if(!result.success) {
        return res.status(result.statusCode).json({
           success : false,
           message : result.message
        })
    }

    return res.status(201).json({
        success : true,
        task : result.task,
        message : result.message
    })
  } catch (error) {
     return res.status(500).json({
        success : false,
        error : error.message,
        message : "error in createTask controller"
     })
  }
};
