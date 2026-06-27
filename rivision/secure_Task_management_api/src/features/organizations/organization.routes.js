import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middileware.js';

import { createOrgValidator } from './organization.validator.js';
import { createOrgController } from './organization.controller.js';

 export const orgRouter = express.Router();

orgRouter.post("/", authMiddleware, 
    createOrgValidator,
    createOrgController
 );