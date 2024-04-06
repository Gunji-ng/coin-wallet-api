import { Model, Schema, model, Types } from 'mongoose';
import { coinTypes } from '../types/coinTypes';
import { transactionTypes } from '../types/transactionTypes';

type ITransaction = {
  initiator: Types.ObjectId;
  recipient: Types.ObjectId;
  amount: number;
  coinType: coinTypes;
  transactionType: transactionTypes;
};

type ITransactionMethods = {
  transact(): void;
};

type TransactionModel = Model<ITransaction, {}, ITransactionMethods>;

const TransactionSchema = new Schema<
  ITransaction,
  TransactionModel,
  ITransactionMethods
>(
  {
    initiator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide initiator'],
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide recipient'],
    },
    amount: {
      type: Number,
      required: [true, 'Please provide transaction amount'],
    },
    coinType: {
      type: String,
      required: [true, 'Please provide coin type'],
    },
    transactionType: {
      type: String,
      required: [true, 'Please provide transaction type'],
    },
  },
  { timestamps: true },
);

/**
 * @openapi
 * components:
 *  schemas:
 *    AllocateCoinsInput:
 *      type: object
 *      required:
 *        - recipient
 *        - amount
 *      properties:
 *        recipient:
 *          type: string
 *          default: user@example.com
 *        amount:
 *          type: integer
 *          default: 1
 *    TransferCoinsInput:
 *      type: object
 *      required:
 *        - recipient
 *        - amount
 *        - coin
 *      properties:
 *        recipient:
 *          type: integer
 *          default: user@example.com
 *        amount:
 *          type: integer
 *          default: 1
 *        coin:
 *          type: string
 *          default: kdjCoins
 *    RedeemCoinsInput:
 *      type: object
 *      required:
 *        - amount
 *        - coin
 *      properties:
 *        amount:
 *          type: integer
 *          default: 1
 *        coin:
 *          type: string
 *          default: kdjCoins
 *    TransactionResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        data:
 *          type: object
 *          properties:
 *            initiator:
 *              type: string
 *            recipient:
 *              type: string
 *            amount:
 *              type: integer
 *            coinType:
 *              type: string
 *            transactionType:
 *              type: string
 *            _id:
 *              type: string
 *            createdAt:
 *              type: string
 */

export default model<ITransaction, TransactionModel>(
  'Transaction',
  TransactionSchema,
);
