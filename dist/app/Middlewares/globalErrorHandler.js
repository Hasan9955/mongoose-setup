"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (err, req, res, next) => {
    //setting default values
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    // if (err instanceof ZodError) {
    //   const simplifiedError = handleZodError(err);
    //   statusCode = simplifiedError?.statusCode;
    //   message = simplifiedError?.message;
    //   errorSources = simplifiedError?.errorSources;
    // } else if (err?.name === 'ValidationError') {
    //   const simplifiedError = handleValidationError(err);
    //   statusCode = simplifiedError?.statusCode;
    //   message = simplifiedError?.message;
    //   errorSources = simplifiedError?.errorSources;
    // } else if (err?.name === 'CastError') {
    //   const simplifiedError = handleCastError(err);
    //   statusCode = simplifiedError?.statusCode;
    //   message = simplifiedError?.message;
    //   errorSources = simplifiedError?.errorSources;
    // } else if (err?.code === 11000) {
    //   const simplifiedError = handleDuplicateError(err);
    //   statusCode = simplifiedError?.statusCode;
    //   message = simplifiedError?.message;
    //   errorSources = simplifiedError?.errorSources;
    // } else if (err instanceof AppError) {
    //   statusCode = err?.statusCode;
    //   message = err.message;
    //   errorSources = [
    //     {
    //       path: '',
    //       message: err?.message,
    //     },
    //   ];
    // } else if (err instanceof Error) {
    //   message = err.message;
    //   errorSources = [
    //     {
    //       path: '',
    //       message: err?.message,
    //     },
    //   ];
    // }
    //ultimate return
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: {
            name: err.name
        },
        stack: config_1.default.node_env === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
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
