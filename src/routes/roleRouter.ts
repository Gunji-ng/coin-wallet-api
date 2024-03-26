import { Router } from 'express';
import { assignRole } from '../controllers/roleController';
import { verifyRolesMiddleware } from '../middleware/verifyRolesMiddleware';
import { appRoles } from '../utils/appRoles';

const roleRouter = Router();

roleRouter.patch('/assign', verifyRolesMiddleware(appRoles.Admin), assignRole);

export default roleRouter;
