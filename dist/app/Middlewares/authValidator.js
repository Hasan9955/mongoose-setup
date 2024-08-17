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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../Errors/AppError"));
const catchAsync_1 = __importDefault(require("../utility/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
// interface CustomRequest extends Request {
//     user: JwtPayload
// }
const authValidator = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
        }
        //step 1: Function system
        // jwt.verify(token, config.jwt_access_secret as string, function (err, decoded) {
        //     if(err){
        //         throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
        //     }
        // })
        //Step 2: check if the token is valid 
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        req.user = decoded;
        const { userId, role, iat } = decoded;
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
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized!');
        }
        next();
    }));
};
exports.default = authValidator;
