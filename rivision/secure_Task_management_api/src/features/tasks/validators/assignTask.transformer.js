import { body } from "express-validator";


export const assignValidator = [
    body("assignTo").notEmpty()
    .withMessage("need a value to update")
    .isInt().withMessage("must be a numeric value")
];