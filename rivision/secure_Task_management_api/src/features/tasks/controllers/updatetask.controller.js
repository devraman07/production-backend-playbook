import { updatetaskservice } from "../services/updatetask.service.js";



export const updatetaskcontroller = (req, res) => {
    try {
        const task = req.task;
        const updatedata = req.body;


        const result = updatetaskservice(task, updatedata);

        if(!result.success) {
            return res.status(result.statuscode).json({
                success : false,
                message : result.message,
               
            })
        }

        return res.status(200).json({
            success : true,
            task : result.task,
            message : result.message,
        })
    } catch (error) {
        
    }
}