import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
import User from '../models/User';
import Balance from "../models/Balance";

const register = async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body });
  const data = JSON.parse(JSON.stringify(user, null, 2));
  const balance = await Balance.create({ User: data._id });
  delete data['password'];
  data['token'] = user.generateToken();

  res.status(StatusCodes.CREATED).json({
    status: true,
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
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Email not registered, kindly sign up');
  }
  const passwordMatch = await user.passwordMatch(password);
  console.log('password match: ', passwordMatch)
  if (!passwordMatch) {
    throw new UnauthenticatedError('No account found for that combination of email and password');
  }

  const data = JSON.parse(JSON.stringify(user, null, 2));
  delete data['password'];
  data['token'] = user.generateToken();

  res.status(StatusCodes.OK).json({
    status: true,
    message: 'User login successful',
    data
  });
};

export { login, register };