"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z
            .string({
            invalid_type_error: 'Password must be a string'
        })
            .max(20, { message: 'password can not be more then 20 character' }).optional(),
        needsPasswordChange: zod_1.z.boolean().optional(),
        status: zod_1.z.enum(['in-progress', 'blocked']).default('in-progress'),
        isDeleted: zod_1.z.boolean().optional().default(false)
    })
});
exports.userValidation = {
    userZodSchema,
};
