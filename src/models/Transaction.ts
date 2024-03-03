import { Model, Schema, model, Types } from "mongoose";

interface ITransaction {
  initiator: Types.ObjectId;
  recipient: Types.ObjectId;
  amount: number;
  coinType: 'dppCoins' | 'kdjCoins';
  transactionType: 'allocation' | 'transfer' | 'conversion' | 'redeem';
};

interface ITransactionMethods {
  transact(): void;
};

type TransactionModel = Model<ITransaction, {}, ITransactionMethods>;

const TransactionSchema = new Schema<ITransaction, TransactionModel, ITransactionMethods>(
  {
    initiator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide initiator']
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide recipient']
    },
    amount: {
      type: Number,
      required: [true, 'Please provide transaction amount']
    },
    coinType: {
      type: String,
      required: [true, 'Please provide coin type']
    },
    transactionType: {
      type: String,
      required: [true, 'Please provide transaction type']
    }
  },
  { timestamps: true }
);

TransactionSchema.method('transact', async function (amount: number) {
  return
});

export default model<ITransaction, TransactionModel>('Transaction', TransactionSchema);