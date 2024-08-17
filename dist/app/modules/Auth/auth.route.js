"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validator_1 = __importDefault(require("../../Middlewares/validator"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const authValidator_1 = __importDefault(require("../../Middlewares/authValidator"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post('/login', (0, validator_1.default)(auth_validation_1.loginValidationSchema), auth_controller_1.authControllers.loginUser);
router.post('/refresh-token', (0, validator_1.default)(auth_validation_1.refreshTokenValidationSchema), auth_controller_1.authControllers.refreshToken);
router.post('/change-password', (0, authValidator_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student), (0, validator_1.default)(auth_validation_1.changePasswordValidationSchema), auth_controller_1.authControllers.changePassword);
exports.AuthRoutes = router;
