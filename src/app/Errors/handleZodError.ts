import { ZodError, ZodIssue } from 'zod';

const handleZodError = (error: ZodError) => {
    const errorSources = error.issues.map((issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message
      }
    })

    const statusCode = 400;
    return {
      statusCode,
      message: "Validation error.",
      errorSources
    }
  }

  export default handleZodError;