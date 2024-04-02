import { Router } from 'express';
import { changePassword, getProfile } from '../controllers/profileController';

const profileRouter = Router();

/**
 * @openapi
 * /api/v1/profile:
 *  get:
 *    tags:
 *      - Profile
 *    summary: Get user profile
 *    responses:
 *      200:
 *        description: Profile retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetProfileResponse'
 *      500:
 *        description: Something went wrong, try again later
 */
profileRouter.get('/', getProfile);

/**
 * @openapi
 * /api/v1/profile/change-password:
 *  patch:
 *    tags:
 *      - Profile
 *    summary: Change user password
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ChangeUserPasswordInput'
 *    responses:
 *      201:
 *        description: Password updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetProfileResponse'
 *      401:
 *        description: Missing required field
 *      500:
 *        description: Something went wrong, try again later
 */
profileRouter.patch('/change-password', changePassword);

export default profileRouter;
