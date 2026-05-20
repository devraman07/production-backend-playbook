import {body} from "express-validator";


export const registerValidation = [
    body("name").notEmpty().withMessage("Name required").isLength({
        min : 3,
        max : 50
    }),
    
    body("email")
    .notEmpty().withMessage("Email required")
    .isEmail().withMessage("Invalid email"),

    body("password")
    .notEmpty().withMessage("Password required")
    .isStrongPassword({
        minLength : 8,
        minUppercase : 1,
        minNumbers : 1
    }).withMessage("Weak password"),

    body("age").isInt({
        min : 18,
        max : 100,
    }).withMessage("Age must be between 18 - 100")

];