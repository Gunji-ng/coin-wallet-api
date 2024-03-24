import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './customApiError';

export default class NotAuthorizedError extends CustomAPIError {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
};