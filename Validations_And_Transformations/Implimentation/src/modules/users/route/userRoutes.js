// userRoutes.js
import express from "express";
import { registerTransformer } from "../transformer/registerTransformer.js";
import { registerValidation } from "../validator/registerValidator.js";
import { login, register, profile, logOut, adminDashboard } from "../controller/usercontroller.js"; // ✅ imported here
import { valiDateReq } from "../../../middlewares/validateRequet.js";
import { loginTransformer } from "../transformer/loginTransformer.js";
import { loginValidation } from "../validator/loginvalidator.js";
import { requireAuth } from "../../../middlewares/requireAuth.js";
import { requireRoles } from "../../../middlewares/requireRole.js";

export const userRouter = express.Router();

userRouter.post("/register", registerTransformer, registerValidation, valiDateReq, register);
userRouter.post("/login", loginTransformer, loginValidation, valiDateReq, login);
userRouter.get("/profile", requireAuth, profile);
userRouter.post("/logout", requireAuth, logOut);
userRouter.get("/admin", requireAuth, requireRoles("admin"), adminDashboard);