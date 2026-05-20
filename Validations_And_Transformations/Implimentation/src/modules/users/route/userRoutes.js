import express from "express";
import { registerTransformer } from "../transformer/registerTransformer.js";
import { registerValidation } from "../validator/registerValidator.js";
import { login, register } from "../controller/usercontroller.js";
import { valiDateReq } from "../../../middlewares/validateRequet.js";
import { loginTransformer } from "../transformer/loginTransformer.js";
import { loginValidation } from "../validator/loginvalidator.js";


export const userRouter = express.Router();


userRouter.post("/register", registerTransformer, registerValidation, valiDateReq,  register);
userRouter.post("/login", loginTransformer, loginValidation, valiDateReq,  login)