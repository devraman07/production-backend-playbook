import { body } from "express-validator";


export const createtaskValidator = [
    body("title").notEmpty().withMessage("title is required").bail()
    .isLength({
        min : 5,
        max : 100,
    }).withMessage("title should be more than 5 words and less than 100 words"),

    body("description").notEmpty()
    .withMessage("description is needed")
    .bail().isLength({
        min : 10,
        max : 300
    }).withMessage(
        "must contain minimum 30 words and maximum 300 words"
    ),
    
    body("assignTo").notEmpty().withMessage("must assign task while creation")
    .isInt().withMessage("assignTo must be a valid user id")

];