import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = ( error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Something went wrong!!!',
      error
    })
    next();
  }

export default globalErrorHandler;