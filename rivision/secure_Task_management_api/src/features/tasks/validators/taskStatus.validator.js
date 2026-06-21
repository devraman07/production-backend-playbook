import { body } from "express-validator";
import { TASK_STATUS } from "../../../data/taskStatus";


export const taskStatusValidator = [

    body("status").notEmpty()
    .withMessage("status is required")
    .isIn(Object.values(TASK_STATUS)).withMessage("Invalid task status"),
];