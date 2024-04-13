import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function errorHandlerMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Log: err with req

  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, try again later',
  };

  if (err.name === 'CastError' && err.message.includes('Transaction')) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: false,
      message: 'Transaction not found',
    });
  }

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
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = errorMessages;
  }

  if (err.code === 11000 && err.keyPattern.email) {
    customError.statusCode = StatusCodes.CONFLICT;
    customError.message = 'email address registered already';
  }

  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
}
