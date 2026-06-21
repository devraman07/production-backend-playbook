import express from "express";
import { authMiddleware } from "../../../middlewares/auth.middileware.js";
import { roleMiddleware } from "../../../middlewares/role.middleware.js";
import { createTaskTransformer } from "../transformers/createtask.transformer.js";
import { createtaskValidator } from "../validators/createtask.validator.js";
import { createtaskController } from "../controllers/createtask.controller.js";
import { ROLES } from "../../../data/roles.js";
import { viewTaskController } from "../controllers/viewTask.controller.js";
import { taskOwnerMiddleware } from "../../../middlewares/taskOwner.middleware.js";
import { updateTaskTransformer } from "../transformers/updatetask.transformer.js";
import { updateTaskvalidator } from "../validators/updateTask.validator.js";
import { updatetaskcontroller } from "../controllers/updatetask.controller.js";
import { deleteTaskController } from "../controllers/deleteTask.controller.js";
import { taskAssignTransformer } from "../transformers/assigntask.transformer.js";
import { assignValidator } from "../validators/assignTask.transformer.js";
import { assigntaskController } from "../controllers/assignTask.controller.js";
import { taskAssignedMiddleware } from "../../../middlewares/taskassignto.middleware.js";

export const taskRouter = express.Router();

taskRouter.post(
  "/",
  authMiddleware,
 roleMiddleware(ROLES.MEMBER),
  createTaskTransformer,
  createtaskValidator,
  createtaskController,
);

taskRouter.get(
    "/",
    authMiddleware,
    viewTaskController
);

taskRouter.patch("/:id", authMiddleware,
  roleMiddleware(ROLES.MEMBER),
  taskOwnerMiddleware,
  updateTaskTransformer,
  updateTaskvalidator,
  updatetaskcontroller
  
);

taskRouter.delete("/:id", authMiddleware,
  roleMiddleware(ROLES.MANAGER),
  taskOwnerMiddleware,
  deleteTaskController
)


taskRouter.patch("/:id/assign", authMiddleware, roleMiddleware(ROLES.MANAGER), 
taskAssignTransformer,
assignValidator, 
assigntaskController);


taskRouter.patch("/:id/status", 
  authMiddleware,
  roleMiddleware(ROLES.MEMBER),
  taskAssignedMiddleware,
  updateTaskTransformer,
  updateTaskvalidator,
  updatetaskcontroller
)
