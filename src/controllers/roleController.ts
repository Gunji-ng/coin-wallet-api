import { Request, Response } from 'express';
import { BadRequestError } from '../errors';
import { StatusCodes } from 'http-status-codes';
import { appRoles } from '../utils/appRoles';
import RoleService from '../services/roleService';

async function assignRole(req: Request, res: Response) {
  const { user, role } = req.body;
  if (!user) throw new BadRequestError('Please provide user (email)');
  if (!role) throw new BadRequestError('Please provide role');
  if (!Object.keys(appRoles).includes(role))
    throw new BadRequestError('Please provide a valid role');

  const data = await new RoleService().assignRole(user, role);

  res.status(StatusCodes.OK).json({
    message: `${user} assigned ${role} role successfully`,
    data,
  });
}

async function unassignRole(req: Request, res: Response) {
  const { user, role } = req.body;
  if (!user) throw new BadRequestError('Please provide user (email)');
  if (!role) throw new BadRequestError('Please provide role');
  if (!Object.keys(appRoles).includes(role))
    throw new BadRequestError('Please provide a valid role');

  const data = await new RoleService().unassignRole(user, role);

  res.status(StatusCodes.OK).json({
    message: `${user} unassigned ${role} role successfully`,
    data,
  });
}

export { assignRole, unassignRole };
