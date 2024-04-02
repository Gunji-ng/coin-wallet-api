import { Router } from 'express';
import { login, register } from '../controllers/authController';

const authRouter = Router();

/**
 * @openapi
 * /api/v1/register:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Register user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUserInput'
 *    responses:
 *      201:
 *        description: User created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      401:
 *        description: Missing required field
 *      500:
 *        description: Something went wrong, try again later
 */
authRouter.post('/register', register);

/**
 * @openapi
 * /api/v1/login:
 *  post:
 *    tags:
 *      - Auth
 *    summary: User login
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginUserInput'
 *    responses:
 *      200:
 *        description: User login successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserResponse'
 *      401:
 *        description: Missing required field
 *      500:
 *        description: Something went wrong, try again later
 */
authRouter.post('/login', login);

export default authRouter;
