import { BadRequestError, NotFoundError } from '../errors';
import User from '../models/User';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';
import { coinTypes } from '../types/coinTypes';
import { transactionTypes } from '../types/transactionTypes';

export default class TransactionService {
  async transactCoins(
    initiator: number,
    recipientEmail: string,
    amount: number,
    coinType: coinTypes,
    transactionType: transactionTypes,
  ) {
    if (!recipientEmail) {
      throw new BadRequestError('Please provide recipient (email)');
    }

    if (!amount) {
      throw new BadRequestError('Please provide amount');
    }

    if (!(typeof amount === 'number')) {
      throw new BadRequestError('Amount should be a number');
    }

    if (amount <= 0) {
      throw new BadRequestError('Please provide a valid amount');
    }

    if (!Object.values(coinTypes).includes(coinType)) {
      throw new BadRequestError('Please provide a valid coin type');
    }

    if (!Object.values(transactionTypes).includes(transactionType)) {
      throw new BadRequestError('Please provide a valid transaction type');
    }

    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) {
      throw new NotFoundError('recipient not found');
    }

    const transactionOptions = {
      initiator,
      recipient: recipient.get('_id'),
      amount,
      coinType,
      transactionType,
    };

    if (
      transactionType === transactionTypes.transfer ||
      transactionType === transactionTypes.redeem
    ) {
      await this.deductFromBalance(initiator, coinType, amount);
    }

    if (transactionType !== transactionTypes.redeem) {
      await this.addToBalance(transactionOptions.recipient, coinType, amount);
    }

    const transaction = await Transaction.create({ ...transactionOptions });
    const data = JSON.parse(JSON.stringify(transaction, null, 2));

    delete data['updatedAt'];
    delete data['__v'];

    return data;
  }

  async addToBalance(userId: number, coinType: coinTypes, amount: number) {
    try {
      await Balance.updateOne({ userId }, { $inc: { [coinType]: amount } });
    } catch (error) {
      // Log: error
      console.log(error);
    }
  }

  async deductFromBalance(userId: number, coinType: coinTypes, amount: number) {
    try {
      // Check if balance is sufficient to be deducted from
      const balance = await Balance.findOne({
        userId,
      });
      const { [coinType]: coinBalance } = JSON.parse(
        JSON.stringify(balance, null, 2),
      );
      if (coinBalance < amount) {
        throw new BadRequestError('Insufficient balance');
      }

      // Deduct from balance
      await Balance.updateOne({ userId }, { $inc: { [coinType]: -amount } });
    } catch (error) {
      //Log: error
      console.log(error);
    }
  }
}
