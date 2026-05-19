import express from "express";

export const authrouter = express.Router();

import { registerValidation } from "../../statefull_Auth/validators/authValidator.js";
import { adminDashboard, login, logout, profile, signup } from "../controllers/authController.js";
import { checkAuthenticated } from "../middlewares/requireHybridAuth.js";
import { requireHybridRole } from "../middlewares/requireHybridRole.js";


authrouter.post("/register", signup);
authrouter.post("/login", login);
authrouter.get("/profile", checkAuthenticated, profile);
authrouter.get("/admin", checkAuthenticated, requireHybridRole("user") , adminDashboard);
authrouter.post("/logout", checkAuthenticated, logout);