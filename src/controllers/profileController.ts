import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors';
import ProfileService from '../services/profileService';

const getProfile = async (req: Request, res: Response) => {
  const data = await new ProfileService().getUserProfile(req.user.userId);

  res.status(StatusCodes.OK).json({
    message: 'Profile retrieved successfully',
    data,
  });
};

const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword: password } = req.body;
  if (!oldPassword || !password) {
    throw new BadRequestError('Both oldPassword and newPassword are required');
  }

  const data = await new ProfileService().changeUserPassword(
    req.user.userId,
    oldPassword,
    password,
  );

  res.status(StatusCodes.OK).json({
    message: 'Password updated successfully',
    data,
  });
};

export { getProfile, changePassword };
