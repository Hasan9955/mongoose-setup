import httpStatus from "http-status";
import AppError from "../Errors/AppError";
import catchAsync from "../utility/catchAsync"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

// interface CustomRequest extends Request {
//     user: JwtPayload
// }


const authValidator = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
        }


        //step 1: Function system
        // jwt.verify(token, config.jwt_access_secret as string, function (err, decoded) {
        //     if(err){
        //         throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
        //     }

        // })

        //Step 2: check if the token is valid 
        // Here we use try-catch function for catch the error when jwt can't decode the token. Such as when the token time will expire!
        let decoded;
        try {
            decoded = jwt.verify(
                token,
                config.jwt_access_secret as string
            ) as JwtPayload
            
        } catch (error) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
        }

        req.user = decoded;
        const { userId, role, iat } = decoded;
        // check if the user exists 
        const currentUser = await User.isUserExists(userId)
        if (!currentUser) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user dose not exists!')
        }
        if (currentUser.isDeleted) {
            throw new AppError(httpStatus.FORBIDDEN, 'This user dose not exists!')
        }
        if (currentUser.status === 'blocked') {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
        }
        
        //check if the token generated before password changed
        const isTokenGeneratedBeforePasswordChanged = User.isJwtIssuedBeforePasswordChanged(currentUser?.passwordChangedAt, iat as number)
        if (isTokenGeneratedBeforePasswordChanged) {
            throw new AppError(httpStatus.FORBIDDEN, 'Please login again!')
        }


        if(requiredRoles && !requiredRoles.includes(role)){
            throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized!')
        }

        next();



    })



}

export default authValidator;