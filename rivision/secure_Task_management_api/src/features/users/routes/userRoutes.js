import express from "express";
import { getusersController } from "../controllers/getusers.controller.js";
import { authMiddleware } from "../../../middlewares/auth.middileware.js";
import { profileController } from "../controllers/profile.controller.js";
import { roleMiddleware } from "../../../middlewares/role.middleware.js";
import { ownerShipCheck } from "../../../middlewares/ownership.middleware.js";
import { updateUserTransformer } from "../transformers/updateUser.transformer.js";
import { updateUserValidator } from "../validators/updateUser.validator.js";
import { updateUserController } from "../controllers/UpdateUser.controller.js";
import { ownerOrAdmincheck } from "../../../middlewares/ownerOradmin.middleware.js";
import { deleteUserController } from "../controllers/deleteUser.controller.js";



export const userRouter = express.Router();


userRouter.get("/", authMiddleware, roleMiddleware("admin"),  getusersController);
userRouter.get("/profile", authMiddleware, profileController);
userRouter.patch("/profile/:id", authMiddleware, ownerShipCheck, updateUserTransformer, updateUserValidator, updateUserController);
userRouter.delete("/profile/:id", authMiddleware, ownerOrAdmincheck, deleteUserController);