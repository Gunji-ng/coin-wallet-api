import { NextFunction, Request, Response } from "express";
import { appRoles } from "../utils/appRoles";
import { NotAuthorizedError } from "../errors";

export function verifyRolesMiddleware(...allowedRoles: appRoles[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user.roles) throw new NotAuthorizedError('Not authorized');
    const rolesArray = [...allowedRoles];
    const result = req.user.roles.map(role => rolesArray.includes(role)).find(val => val === true);
    if (!result) throw new NotAuthorizedError('Not authorized');
    next();
  }
}