import { body } from "express-validator";


export const loginValidator = [

    body("email").notEmpty().withMessage(
        "email is required"
    ).isEmail().withMessage(
        "invalid email"
    ),
    body("password_hash").notEmpty().withMessage(
        "password is required"
    )
]