export class AppError extends Error {
  statusCode: any;
  status: any;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
