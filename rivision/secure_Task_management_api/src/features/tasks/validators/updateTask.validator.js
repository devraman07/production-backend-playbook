import {body} from "express-validator";

export const updateTaskvalidator = [
    body("title").optional()
    .isLength({
        min : 10,
        max : 100,
    }).withMessage(
        "title must contain atleast 10 and atmost 100 words",
    ),

    body("description").optional()
    .isLength({
        min : 30,
        max : 300,
    }).withMessage(
        "decription must contain atleast 10 and atmost 300 words",
    ),

    body("assignedTo").optional().isInt().withMessage("this propety must be number")
];