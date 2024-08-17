import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod';
import catchAsync from '../utility/catchAsync';


const validationRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const bodyData = req.body;
        const cookies = req.cookies
        //validate
        // await schema.parseAsync(bodyData)

        // If you want to get the data as an Object like body, cookie
        await schema.parseAsync({
            body: req.body,
            cookie: req.cookies
        })

        next()
    })
}

export default validationRequest;