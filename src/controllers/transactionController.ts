import { Request, Response } from 'express';
import { coinTypes } from '../utils/coinTypes';
import TransactionService from '../services/transactionService';
import { transactionTypes } from '../utils/transactionTypes';
import { StatusCodes } from 'http-status-codes';

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
