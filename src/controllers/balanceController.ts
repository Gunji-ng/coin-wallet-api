import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
import User from '../models/User';
import Balance from "../models/Balance";

const getBalance = async (req: Request, res: Response) => {
  const data = await Balance.findOne({ User: req.user.userId }).select(['-_id', '-User', '-createdAt', '-updatedAt', '-__v']);

  res.status(StatusCodes.OK).json({
    message: 'Balance retrieved successfully',
    data
  });
};

export { getBalance };