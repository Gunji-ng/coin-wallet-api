import { Router } from 'express';
import { getBalance } from '../controllers/balanceController';

const balanceRouter = Router();

/**
 * @openapi
 * /api/v1/balance:
 *  get:
 *    tags:
 *      - Balance
 *    summary: Get user balance
 *    responses:
 *      200:
 *        description: Balance retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetBalanceResponse'
 *      500:
 *        description: Something went wrong, try again later
 */
balanceRouter.get('/', getBalance);

export default balanceRouter;
