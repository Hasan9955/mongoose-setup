import { ErrorRequestHandler, NextFunction, Response, Request } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config'; 
import handleZodError from '../Errors/handleZodError';

 
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;