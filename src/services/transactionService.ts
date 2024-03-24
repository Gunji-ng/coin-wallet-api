import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Balance from "../models/Balance";
import { coinTypes } from "../utils/coinTypes";
import { transactionTypes } from "../utils/transactionTypes";

export default class TransactionService {
  async allocateCoins(req: Request, res: Response, coinType: coinTypes) {
    const { amount } = req.body;

    if (!req.body.recipient) {
      throw new BadRequestError('Please provide recipient');
    };

    if (!amount) {
      throw new BadRequestError('Please provide amount');
    };

    if (!(typeof amount === 'number')) {
      throw new BadRequestError('Amount should be a number');
    }

    if (amount <= 0) {
      throw new BadRequestError('Please provide a valid amount');
    }

    req.body.initiator = req.user.userId;
    const recipient = await User.findOne({ email: req.body.recipient });
    if (!recipient) {
      throw new NotFoundError('recipient not found');
    }

    req.body.recipient = recipient.get('_id');
    req.body.coinType = coinType;
    req.body.transactionType = transactionTypes.ALLOCATION;

    try {
      await Balance.updateOne(
        { userId: req.body.recipient },
        { '$inc': { [coinType]: amount } }
      );
    } catch (error) {
      // Log: error
      console.log(error);
    }

    const transaction = await Transaction.create({ ...req.body });
    const data = JSON.parse(JSON.stringify(transaction, null, 2));

    delete data['updatedAt'];
    delete data['__v'];

    res.status(StatusCodes.OK).json({
      message: `${amount} ${coinType} allocated successfully`,
      data
    });
  };
}