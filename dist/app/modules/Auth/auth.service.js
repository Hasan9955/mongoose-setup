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
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_utils_1 = require("./auth.utils");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the user exists 
    const currentUser = yield user_model_1.User.isUserExists(payload.id);
    if (!currentUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user dose not exists!');
    }
    if (currentUser.isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user dose not exists!');
    }
    if (currentUser.status === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked!');
    }
    // checking if the password is correct 
    const isPasswordMatch = yield user_model_1.User.isPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.password, currentUser === null || currentUser === void 0 ? void 0 : currentUser.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password does not match!');
    }
    //create token and send it to the client
    const jwtPayload = {
        userId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
        role: currentUser === null || currentUser === void 0 ? void 0 : currentUser.role
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_time);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expire_time);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: currentUser === null || currentUser === void 0 ? void 0 : currentUser.needsPasswordChange
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
    }
    //check if the token is valid 
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { userId, iat } = decoded;
    // check if the user exists 
    const currentUser = yield user_model_1.User.isUserExists(userId);
    if (!currentUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user dose not exists!');
    }
    if (currentUser.isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user dose not exists!');
    }
    if (currentUser.status === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked!');
    }
    //check if the token generated before password changed
    const isTokenGeneratedBeforePasswordChanged = user_model_1.User.isJwtIssuedBeforePasswordChanged(currentUser === null || currentUser === void 0 ? void 0 : currentUser.passwordChangedAt, iat);
    if (isTokenGeneratedBeforePasswordChanged) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Please login again!');
    }
    //create token and send it to the client
    const jwtPayload = {
        userId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
        role: currentUser === null || currentUser === void 0 ? void 0 : currentUser.role
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_time);
    return {
        accessToken
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the user exists 
    const currentUser = yield user_model_1.User.isUserExists(user === null || user === void 0 ? void 0 : user.userId);
    if (!currentUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user dose not exists!');
    }
    if (currentUser.isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user dose not exists!');
    }
    if (currentUser.status === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked!');
    }
    // checking if the password is correct 
    const isPasswordMatch = yield user_model_1.User.isPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.oldPassword, currentUser === null || currentUser === void 0 ? void 0 : currentUser.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password does not match!');
    }
    //hash new password
    const newHashPassword = yield bcrypt_1.default.hash(payload === null || payload === void 0 ? void 0 : payload.newPassword, Number(config_1.default.bcrypt_salt));
    const result = yield user_model_1.User.findOneAndUpdate({
        id: user === null || user === void 0 ? void 0 : user.userId,
        role: user === null || user === void 0 ? void 0 : user.role
    }, {
        password: newHashPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date()
    });
    return result ? 'Password changed successfully!' : null;
});
exports.authServices = {
    loginUser,
    refreshToken,
    changePassword
};
