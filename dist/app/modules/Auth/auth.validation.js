"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidationSchema = exports.refreshTokenValidationSchema = exports.loginValidationSchema = void 0;
const zod_1 = require("zod");
exports.loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'Id is required!' }),
        password: zod_1.z.string({ required_error: 'Password is required' })
    })
});
exports.refreshTokenValidationSchema = zod_1.z.object({
    cookie: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required.'
        })
    })
});
exports.changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: 'Old password is required!'
        }),
        newPassword: zod_1.z.string({ required_error: 'Password is required' })
    })
});
