import express from "express";
import { registerController } from "../controllers/registercontroller.js";
import { registerTransformer } from "../transoformers/registerTransformer.js";
import { registerVlaidator } from "../validators/registerValidator.js";



export const AuthRouter = express.Router();

AuthRouter.post('/register', registerTransformer, registerVlaidator, registerController);