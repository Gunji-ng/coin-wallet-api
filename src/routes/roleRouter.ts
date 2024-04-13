import { Router } from 'express';
import { assignRole, unassignRole } from '../controllers/roleController';
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
 *    description: Only accessible by Admins
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateRoleInput'
 *    responses:
 *      200:
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

/**
 * @openapi
 * /api/v1/roles/unassign:
 *  patch:
 *    tags:
 *      - Roles
 *    summary: Unassign role from user
 *    description: Only accessible by Admins
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateRoleInput'
 *    responses:
 *      200:
 *        description: Role unassigned successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetProfileResponse'
 *      401:
 *        description: Missing required field
 *      500:
 *        description: Something went wrong, try again later
 */
roleRouter.patch(
  '/unassign',
  verifyRolesMiddleware(appRoles.Admin),
  unassignRole,
);

export default roleRouter;
