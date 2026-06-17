import express from "express";
import { getusersController } from "../controllers/getusers.controller.js";
import { authMiddleware } from "../../../middlewares/auth.middileware.js";
import { profileController } from "../controllers/profile.controller.js";



export const userRouter = express.Router();


userRouter.get("/",  getusersController);
userRouter.get("/profile", authMiddleware, profileController);