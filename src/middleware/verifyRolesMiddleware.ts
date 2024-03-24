import { NextFunction, Request, Response } from "express";
import { appRoles } from "../utils/appRoles";
import { UnauthenticatedError } from "../errors";

export function verifyRolesMiddleware(...allowedRoles: appRoles[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user.roles) throw new UnauthenticatedError('Not authorized');
    const rolesArray = [...allowedRoles];
    const result = req.user.roles.map(role => rolesArray.includes(role)).find(val => val === true);
    if (!result) throw new UnauthenticatedError('Not authorized');
    next();
  }
}