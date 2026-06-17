import express from "express";
import { registerController } from "../controllers/registercontroller.js";
import { registerTransformer } from "../transoformers/registerTransformer.js";
import { registerVlaidator } from "../validators/registerValidator.js";
import { loginValidator } from "../validators/loginValidator.js";
import { loginTransformer } from "../transoformers/loginTransformer.js";
import { loginController } from "../controllers/loginController.js";
import { refreshController } from "../controllers/refreshCOntroller.js";
import { logoutController } from "../controllers/lououtController.js";
import { authMiddleware } from "../../../middlewares/auth.middileware.js";
import { userProfile } from "../controllers/profileController.js";
import { refreshMiddleware } from "../../../middlewares/refresh.middleware.js";



export const AuthRouter = express.Router();

AuthRouter.post('/register', registerTransformer, registerVlaidator, registerController);
AuthRouter.post("/login", loginValidator, loginTransformer, loginController);
AuthRouter.post("/refresh", refreshMiddleware, refreshController);
AuthRouter.post("/logout", logoutController);
AuthRouter.get("/profile", authMiddleware, userProfile);
