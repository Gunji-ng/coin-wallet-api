import { Router } from 'express';
import {
  allocateDppCoins,
  allocateKdjCoins,
  redeemCoins,
  transferCoins,
} from '../controllers/transactionController';
import { verifyRolesMiddleware } from '../middleware/verifyRolesMiddleware';
import { appRoles } from '../utils/appRoles';

const transactionRouter = Router();

/**
 * @openapi
 * /api/v1/transactions/allocate/dpp:
 *  post:
 *    tags:
 *      - Transactions
 *    summary: Allocate dppCoins to User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AllocateCoinsInput'
 *    responses:
 *      201:
 *        description: Transaction successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TransactionResponse'
 *      401:
 *        description: Missing required field
 *      500:
 *        description: Something went wrong, try again later
 */
transactionRouter.post(
  '/allocate/dpp',
  verifyRolesMiddleware(appRoles.DPP_Admin),
  allocateDppCoins,
);

/**
 * @openapi
 * /api/v1/transactions/allocate/kdj:
 *  post:
 *    tags:
 *      - Transactions
 *    summary: Allocate kdjCoins to User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AllocateCoinsInput'
 *    responses:
 *      201:
 *        description: Transaction successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TransactionResponse'
 *      401:
 *        description: Missing required field
 *      500:
 *        description: Something went wrong, try again later
 */
transactionRouter.post(
  '/allocate/kdj',
  verifyRolesMiddleware(appRoles.KDJ_Admin),
  allocateKdjCoins,
);

/**
 * @openapi
 * /api/v1/transactions/transfer:
 *  post:
 *    tags:
 *      - Transactions
 *    summary: Transfer coins to another User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TransferCoinsInput'
 *    responses:
 *      201:
 *        description: Transaction successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TransactionResponse'
 *      401:
 *        description: Missing required field
 *      500:
 *        description: Something went wrong, try again later
 */
transactionRouter.post('/transfer', transferCoins);

/**
 * @openapi
 * /api/v1/transactions/redeem:
 *  post:
 *    tags:
 *      - Transactions
 *    summary: Redeem coins
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RedeemCoinsInput'
 *    responses:
 *      201:
 *        description: Transaction successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TransactionResponse'
 *      401:
 *        description: Missing required field
 *      500:
 *        description: Something went wrong, try again later
 */
transactionRouter.post('/redeem', redeemCoins);

export default transactionRouter;
