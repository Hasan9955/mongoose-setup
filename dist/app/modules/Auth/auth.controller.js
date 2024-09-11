"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const auth_service_1 = require("./auth.service");
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.loginUser(req.body);
    const { refreshToken, accessToken, needsPasswordChange } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.node_env === 'production',
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: 'User logged Successfully.',
        data: {
            accessToken,
            needsPasswordChange
        }
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.authServices.refreshToken(refreshToken);
    res.status(200).json({
        success: true,
        message: 'Token retrieved Successfully.',
        data: result
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const data = req.body;
    const result = yield auth_service_1.authServices.changePassword(user, data);
    res.status(200).json({
        success: true,
        message: 'Password changed Successfully.',
        data: result
    });
}));
exports.authControllers = {
    loginUser,
    refreshToken,
    changePassword
};
