import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod';
import catchAsync from '../utility/catchAsync';


const validationRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const bodyData = req.body;
        //validate
        await schema.parseAsync(bodyData)

        next()
    })
}

export default validationRequest;