import express from "express";
import { registerTransformer } from "../transformer/registerTransformer.js";
import { registerValidation } from "../validator/registerValidator.js";
import { login, register, profile, logOut } from "../controller/usercontroller.js";
import { valiDateReq } from "../../../middlewares/validateRequet.js";
import { loginTransformer } from "../transformer/loginTransformer.js";
import { loginValidation } from "../validator/loginvalidator.js";
import {requireAuth} from "../../../middlewares/requireAuth.js";


export const userRouter = express.Router();


userRouter.post("/register", registerTransformer, registerValidation, valiDateReq,  register);
userRouter.post("/login", loginTransformer, loginValidation, valiDateReq,  login);
userRouter.get("/profile", requireAuth, profile);
userRouter.post("/logout", requireAuth, logOut);