import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './customApiError';

export default class NotFoundError extends CustomAPIError {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
};