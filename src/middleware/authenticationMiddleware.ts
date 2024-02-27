import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors';
import { NextFunction, Request, Response } from 'express';
import { User } from '../types/custom';

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
};

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthenticatedError('No authorization header found');
  };
  if (!authorization.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authorization format should be [Bearer <token>]');
  };
  const token = authorization.split(' ')[1];
  try {
    const decodedPayload = jwt.verify(token, process.env.APP_KEY as string) as jwt.JwtPayload;
    req.user = { userId: decodedPayload.userId, email: decodedPayload.email, name: decodedPayload.name, roles: decodedPayload.roles };
  } catch (error) {
    throw new UnauthenticatedError('Invalid authorization token')
  }
  next();
};