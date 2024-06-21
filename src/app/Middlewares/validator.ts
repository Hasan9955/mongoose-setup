import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod';


const validationRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bodyData = req.body;
            //validate
            await schema.parseAsync(bodyData)
            
            next()
        } catch (error) {
            next(error)

        }
    }
}

export default validationRequest;