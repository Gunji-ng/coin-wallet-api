import { Router } from 'express';
import {
  allocateDppCoins,
  allocateKdjCoins,
  getTransaction,
  getUserTransactions,
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
 *      200:
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
 *      200:
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
 *      200:
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
 *      200:
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

/**
 * @openapi
 * /api/v1/transactions:
 *  get:
 *    tags:
 *      - Transactions
 *    summary: Get user's transactions
 *    responses:
 *      200:
 *        description: Transactions retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserTransactionsResponse'
 *      500:
 *        description: Something went wrong, try again later
 */
transactionRouter.get('/', getUserTransactions);

/**
 * @openapi
 * /api/v1/transactions/{transactionId}:
 *  get:
 *    tags:
 *      - Transactions
 *    summary: Get single transaction
 *    parameters:
 *     - name: transactionId
 *       in: path
 *       description: The id of the transaction
 *       required: true
 *    responses:
 *      200:
 *        description: Transaction retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TransactionResponse'
 *      404:
 *        description: Transaction not found
 *      500:
 *        description: Something went wrong, try again later
 */
transactionRouter.get('/:transactionId', getTransaction);

export default transactionRouter;
