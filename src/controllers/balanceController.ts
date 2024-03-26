import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Balance from '../models/Balance';

const getBalance = async (req: Request, res: Response) => {
  const data = await Balance.findOne({ userId: req.user.userId }).select([
    '-_id',
    '-userId',
    '-createdAt',
    '-updatedAt',
    '-__v',
  ]);

  res.status(StatusCodes.OK).json({
    message: 'Balance retrieved successfully',
    data,
  });
};

export { getBalance };
