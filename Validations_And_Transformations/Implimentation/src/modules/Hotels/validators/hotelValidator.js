import { body } from "express-validator";

export const createHotelValidation = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Hotel name required"),

  body("city")
    .trim()
    .notEmpty()
    .withMessage("City required"),

  body("price")
    .isFloat({ min: 1 })
    .withMessage("Price must be positive"),

  body("rating")
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),

  body("availableRooms")
    .isInt({ min: 0 })
    .withMessage(
      "Available rooms must be positive"
    ),
];