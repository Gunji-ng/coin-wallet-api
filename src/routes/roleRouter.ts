import { Router } from 'express';
import { assignRole } from '../controllers/roleController';
import { verifyRolesMiddleware } from '../middleware/verifyRolesMiddleware';
import { appRoles } from '../utils/appRoles';

const roleRouter = Router();

/**
 * @openapi
 * /api/v1/roles/assign:
 *  patch:
 *    tags:
 *      - Roles
 *    summary: Assign role to user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AssignRoleInput'
 *    responses:
 *      201:
 *        description: Role assigned successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetProfileResponse'
 *      401:
 *        description: Missing required field
 *      500:
 *        description: Something went wrong, try again later
 */
roleRouter.patch('/assign', verifyRolesMiddleware(appRoles.Admin), assignRole);

// TODO: unassign role

export default roleRouter;
