import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Balance from "../models/Balance";


// TODO: give access to only DPP Admin
const allocateDppCoins = async (req: Request, res: Response) => {
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
  req.body.coinType = 'dppCoins';
  req.body.transactionType = 'allocation';
  const transaction = await Transaction.create({ ...req.body });
  const data = JSON.parse(JSON.stringify(transaction, null, 2));

  delete data['updatedAt'];
  delete data['__v'];

  // TODO: update directly on server
  const recipientBalance = await Balance.findOne({ userId: req.body.recipient });
  if (recipientBalance) {
    recipientBalance.dppCoins = recipientBalance.dppCoins += amount;
    await recipientBalance.save();
  }

  res.status(StatusCodes.OK).json({
    message: `${amount} DPP coins allocated successfully`,
    data
  });
};

export {
  allocateDppCoins
};