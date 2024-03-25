import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { appRoles } from "../utils/appRoles";


async function assignRole(req: Request, res: Response) {
  const { user, role } = req.body;
  if (!user) throw new BadRequestError('Please provide user (email)');
  if (!role) throw new BadRequestError('Please provide role');
  if (!(Object.keys(appRoles).includes(role))) throw new BadRequestError('Please provide a valid role');

  const recipient = await User.findOne({ email: user });
  if (!recipient) {
    throw new NotFoundError('recipient not found');
  }

  const data = await User.findOneAndUpdate(
    { _id: recipient.get('_id') },
    { '$addToSet': { roles: appRoles[role] } },
    { new: true, runValidators: true }
  ).select(['-_id', '-createdAt', '-updatedAt', '-__v']);
  // TODO: Log recipient out so new token can be generated

  res.status(StatusCodes.OK).json({
    message: `${user} assigned ${role} role successfully`,
    data
  })
};

export { assignRole };