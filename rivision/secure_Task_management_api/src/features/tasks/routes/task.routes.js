import express from "express";
import { authMiddleware } from "../../../middlewares/auth.middileware.js";
import { roleMiddleware } from "../../../middlewares/role.middleware.js";
import { createTaskTransformer } from "../transformers/createtask.transformer.js";
import { createtaskValidator } from "../validators/createtask.validator.js";
import { createtaskController } from "../controllers/createtask.controller.js";
import { ROLES } from "../../../data/roles.js";
import { viewTaskController } from "../controllers/viewTask.controller.js";

export const taskRouter = express.Router();

taskRouter.post(
  "/",
  authMiddleware,
 roleMiddleware(ROLES.MANAGER),
  createTaskTransformer,
  createtaskValidator,
  createtaskController,
);

taskRouter.get(
    "/",
    authMiddleware,
    viewTaskController
);
