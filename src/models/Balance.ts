import { Model, Schema, model, Types } from 'mongoose';

type IBalance = {
  userId: Types.ObjectId;
  dppCoins: number;
  kdjCoins: number;
};

type IBalanceMethods = {
  convertCoins(): void;
  addDppPoints(amount: number): void;
  subtractDppPoints(amount: number): void;
  addKdjPoints(amount: number): void;
  subtractKdjPoints(amount: number): void;
};

type BalanceModel = Model<IBalance, {}, IBalanceMethods>;

const BalanceSchema = new Schema<IBalance, BalanceModel, IBalanceMethods>(
  {
    dppCoins: {
      type: Number,
      required: true,
      default: 0,
      validate: {
        validator: (value: number): boolean => {
          return value >= 0;
        },
        message: 'dppCoins Balance cannot be less than 0',
      },
    },
    kdjCoins: {
      type: Number,
      required: true,
      default: 0,
      validate: {
        validator: (value: number): boolean => {
          return value >= 0;
        },
        message: 'kdjCoins Balance cannot be less than 0',
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true },
);

/**
 * This is a one-way conversion only.
 * i.e. conversion can only be from dppCoins to kdjCoins.
 * You can't convert kdjCoins to dppCoins.
 * dppCoins can only be earned from DPP_Admin.
 */
BalanceSchema.method('convertCoins', async function (amount: number) {
  return;
});

export default model<IBalance, BalanceModel>('Balance', BalanceSchema);
