import { body } from "express-validator";

export const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("Name Must be at least 3 charracters"),

    body("email").trim()
    .isEmail()
    .withMessage("valid email required")
    .normalizeEmail(),

    body("password")
    .isLength({min : 8})
    .withMessage("password must be of 8 charracters")
    .matches(/[ A-Z]/)
    .withMessage("must contain upperase letters")
    .matches(/[0-9]/)
    .withMessage("must contain numbers")
];


export const loginValidators = [
  body("email")
  .trim()
  .isEmail()
  .withMessage("Valid email required")
  .normalizeEmail(),

  body("password")
  .notEmpty()
  .withMessage("password required")
]
