import express from "express";
import { login, passHandler, passowrdReset, profile, refreshtoken, signup } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/requirejwtauth.js";





export const statelessAuthrouter = express.Router();

statelessAuthrouter.post("/register", signup );
statelessAuthrouter.post("/login", login);
statelessAuthrouter.get("/profile", requireAuth, profile );
statelessAuthrouter.post('/refresh-token', refreshtoken);
statelessAuthrouter.post("/password-reset", passowrdReset);
statelessAuthrouter.post("/pass-handler", passHandler);
