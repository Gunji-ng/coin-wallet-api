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

const redeemCoins = async (req: Request, res: Response) => {
  const { amount } = req.body;
  const coin = req.body.coin as coinTypes;

  const response = await new TransactionService().transactCoins(
    req.user.userId,
    req.user.email,
    amount,
    coinTypes[coin],
    transactionTypes.redeem,
  );

  res.status(StatusCodes.OK).json({
    message: 'Transaction successful',
    data: response,
  });
};

const getUserTransactions = async (req: Request, res: Response) => {
  const response = await new TransactionService().getUserTransactions(
    req.user.userId,
  );

  res.status(StatusCodes.OK).json({
    message: 'Transactions retrieved successfully',
    data: response,
  });
};

const getTransaction = async (req: Request, res: Response) => {
  const response = await new TransactionService().getSingleTransaction(
    req.params.transactionId,
    req.user.userId,
  );

  if (response === null) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: false,
      message: 'Transaction not found',
    });
  }

  res.status(StatusCodes.OK).json({
    message: 'Transaction retrieved successfully',
    data: response,
  });
};

export {
  allocateDppCoins,
  allocateKdjCoins,
  transferCoins,
  redeemCoins,
  getTransaction,
  getUserTransactions,
};
