import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import User from "../models/User";
import Transaction from "../models/Transaction";
import Balance from "../models/Balance";



const allocateDppCoins = async (req: Request, res: Response) => {
  const { amount } = req.body;

  if (!req.body.recipient) {
    throw new BadRequestError('Please provide recipient');
  };

  if (amount <= 0 || !(typeof amount === 'number')) {
    throw new BadRequestError('Please provide a valid amount');
  }

  if (!amount) {
    throw new BadRequestError('Please provide amount');
  };

  req.body.initiator = req.user.userId;
  const recipient = await User.findOne({ email: req.body.recipient });
  if (!recipient) {
    throw new NotFoundError('recipient not found');
  }

  req.body.recipient = recipient.get('_id');
  req.body.coinType = 'dppCoins';
  req.body.transactionType = 'allocation';
  const data = await Transaction.create({ ...req.body });

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