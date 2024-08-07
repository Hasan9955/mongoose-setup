import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config'; 
import handleZodError from '../Errors/handleZodError';
import handleValidationError from '../Errors/handleValidationError';
import handleCastError from '../Errors/handleCastError';
import handleDuplicateError from '../Errors/handleDuplicateError';
import AppError from '../Errors/AppError';

 
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  //setting default values
  let statusCode = error.status ? error.status : 500;
  let message = error.message ? error.message : 'Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error instanceof AppError) { 
    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = [
      {
        path: '',
        message: error?.message
      }
    ]
  } else if (error instanceof Error) { 
    statusCode = 400
    message = error?.message;
    errorSources = [
      {
        path: '',
        message: error?.message
      }
    ]
  } 



  
 
  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message, 
    errorSources,
    stack: config.node_env === 'development' ? error?.stack : null,
    error,
  });
};

export default globalErrorHandler;

//pattern
/*
success
message
errorSources:[
  path:'',
  message:''
]
stack
*/