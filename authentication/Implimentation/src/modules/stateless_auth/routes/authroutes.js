import express from "express";
import { login, profile, signup } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/requirejwtauth.js";





export const statelessAuthrouter = express.Router();

statelessAuthrouter.post("/register", signup );
statelessAuthrouter.post("/login", login);
statelessAuthrouter.get("/profile", requireAuth, profile );