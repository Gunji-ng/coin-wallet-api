import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { BadRequestError, UnauthenticatedError } from "../errors";

const getProfile = async (req: Request, res: Response) => {
  const data = await User.findOne({ _id: req.user.userId }).select(['-_id', '-createdAt', '-updatedAt', '-__v']);

  res.status(StatusCodes.OK).json({
    message: 'Profile retrieved successfully',
    data
  });
};

const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword: password } = req.body;
  if (!oldPassword || !password) {
    throw new BadRequestError('Both oldPassword and newPassword are required');
  }

  const user = await User.findOne({ _id: req.user.userId }).select(['+password']);
  if (!user) {
    // Log: "user not found"
    throw new UnauthenticatedError('An error occurred');
  }

  const passwordMatch = await user.passwordMatch(oldPassword);
  if (!passwordMatch) {
    // Log: "password mismatch"
    throw new UnauthenticatedError('An error occurred');
  }

  const data = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { password },
    { new: true, runValidators: true }
  ).select(['-_id', '-createdAt', '-updatedAt', '-__v']);

  res.status(StatusCodes.OK).json({
    message: 'Password updated successfully',
    data
  });
};

export { getProfile, changePassword };