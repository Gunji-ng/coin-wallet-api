import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors';
import AuthService from '../services/authService';

const register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  const data = await new AuthService().registerUser(email, name, password);

  res.status(StatusCodes.CREATED).json({
    message: 'User created successfully',
    data,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    throw new BadRequestError('Please provide email');
  }

  if (!password) {
    throw new BadRequestError('Please provide password');
  }

  const data = await new AuthService().loginUser(email, password);

  res.status(StatusCodes.OK).json({
    message: 'User login successful',
    data,
  });
};

export { login, register };
