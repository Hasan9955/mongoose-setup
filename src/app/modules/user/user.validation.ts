import {z} from 'zod';

const userZodSchema = z.object({ 
    password: z
    .string({
        invalid_type_error: 'Password must be a string'
    })
    .max(20, {message: 'password can not be more then 20 character'}).optional(),
    needsPasswordChange: z.boolean().optional(), 
    status: z.enum(['in-progress', 'blocked']).default('in-progress'),
    isDeleted: z.boolean().optional().default(false)
})


export const userValidation = {
    userZodSchema,
}