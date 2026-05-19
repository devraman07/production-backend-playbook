import express from "express";

import {
  loginValidators,
  registerValidation,
} from "../validators/authValidator.js";
import { adminDashboard, Login, logout, profile, register } from "../controllers/authController.js";
import { requiresessionAuth } from "../middlewares/authmiddleware.js";
import { requireRole } from "../middlewares/checkRoles.js";


export const router = express.Router();

router.post("/register", register);
router.post("/login", loginValidators, Login);
router.get("/profile", requiresessionAuth, profile);
router.post('/logout', logout);

router.get('/admin' , requireRole("user"),adminDashboard);