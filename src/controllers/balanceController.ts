import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BalanceService from '../services/balanceService';

const getBalance = async (req: Request, res: Response) => {
  const data = await new BalanceService().getUserBalance(req.user.userId);

  res.status(StatusCodes.OK).json({
    message: 'Balance retrieved successfully',
    data,
  });
};

export { getBalance };
