import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
import User from '../models/User';
import Balance from "../models/Balance";

const register = async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body });
  const data = JSON.parse(JSON.stringify(user, null, 2));
  data['token'] = user.generateToken();
  await Balance.create({ userId: data._id });

  delete data['password'];
  delete data['_id'];
  delete data['updatedAt'];
  delete data['__v'];

  res.status(StatusCodes.CREATED).json({
    message: 'User created successfully',
    data
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    throw new BadRequestError('Please provide email');
  };

  if (!password) {
    throw new BadRequestError('Please provide password');
  };

  const user = await User.findOne({ email }).select(['+password', '-createdAt', '-updatedAt', '-__v']);
  if (!user) {
    throw new UnauthenticatedError('Email not registered, kindly sign up');
  }

  const passwordMatch = await user.passwordMatch(password);
  if (!passwordMatch) {
    throw new UnauthenticatedError('No account found for that combination of email and password');
  }

  const data = JSON.parse(JSON.stringify(user, null, 2));
  data['token'] = user.generateToken();

  delete data['password'];
  delete data['_id'];

  res.status(StatusCodes.OK).json({
    message: 'User login successful',
    data
  });
};

export { login, register };