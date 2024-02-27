import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {

  if (err.name === 'ValidationError') {
    let errorMessages = [];
    const errors = err.errors;
    for (const error in errors) {
      const errorJson = errors[error];
      errorMessages.push(errorJson.properties.message);
    }
    if (errorMessages.length === 1) {
      errorMessages = errorMessages[0];
    }
    return res.status(StatusCodes.BAD_REQUEST).json({ message: errorMessages });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};