import { Request, Response } from 'express';
import { coinTypes } from '../types/coinTypes';
import TransactionService from '../services/transactionService';
import { transactionTypes } from '../types/transactionTypes';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors';

const allocateDppCoins = async (req: Request, res: Response) => {
  const { recipient, amount } = req.body;

  const response = await new TransactionService().transactCoins(
    req.user.userId,
    recipient,
    amount,
    coinTypes.dppCoins,
    transactionTypes.allocation,
  );

  res.status(StatusCodes.OK).json({
    message: 'Transaction successful',
    data: response,
  });
};

const allocateKdjCoins = async (req: Request, res: Response) => {
  const { recipient, amount } = req.body;

  const response = await new TransactionService().transactCoins(
    req.user.userId,
    recipient,
    amount,
    coinTypes.kdjCoins,
    transactionTypes.allocation,
  );

  res.status(StatusCodes.OK).json({
    message: 'Transaction successful',
    data: response,
  });
};

const transferCoins = async (req: Request, res: Response) => {
  const { recipient, amount } = req.body;
  const coin = req.body.coin as coinTypes;

  if (coinTypes[coin] === coinTypes.dppCoins) {
    throw new BadRequestError('Cannot transfer dppCoins');
  }

  if (recipient === req.user.email) {
    throw new BadRequestError('Cannot make transfer to self');
  }

  const response = await new TransactionService().transactCoins(
    req.user.userId,
    recipient,
    amount,
    coinTypes[coin],
    transactionTypes.transfer,
  );

  res.status(StatusCodes.OK).json({
    message: 'Transaction successful',
    data: response,
  });
};

export { allocateDppCoins, allocateKdjCoins, transferCoins };
