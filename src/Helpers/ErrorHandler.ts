import { RESPONSE } from "../Constants/ResponseConstant";
import { AppError } from "../Utils/AppError";

export class ErrorHandler {
  constructor() {

  }

  static globalErrorHandler(err, req, res, next) {
    err.statusCode = err.statusCode || RESPONSE.HTTP_INTERNAL_SERVER_ERROR;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'dev') {
      this.sendErrDev(err, res);
    } else {
      let error = { ...err };
      console.log('error', error);
      if (error.name === 'JsonWebTokenError') error = this.handleJwtError();
      if (error.name === 'TokenExpiredError') error = this.handleExpiredTokenError();
      if (error.kind === 'ObjectId') error = this.handleCastError(error);
      if (!error.message) {
        error.message = err.message;
      }
      this.sendErrProd(error, res);
    }
  }

  static handleJwtError() {
    console.log('handle jwt error');
    return new AppError('Invalid token, please log in again!', RESPONSE.HTTP_UNAUTHORIZED);
  }

  static handleExpiredTokenError() {
    return new AppError('Token Expired, please logIn again', RESPONSE.HTTP_UNAUTHORIZED);
  }

  static handleCastError(err) {
    const idValue = err.value;
    return new AppError(`Invalid id '${idValue}', Please provide a valid id`, RESPONSE.HTTP_BAD_REQUEST);
  }


  static sendErrDev(err, res) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    })
  }

  static sendErrProd(err, res) {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });

      // programming or other unknown errors : don't want to leak error details
    } else {
      // 1) log the errors
      console.error('Error : ', err);
      // 2) send a generic message
      res.status(RESPONSE.HTTP_INTERNAL_SERVER_ERROR).json({
        status: 500,
        message: 'Something Went Wrong',
      })
    }
  }
}