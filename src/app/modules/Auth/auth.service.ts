import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from 'bcrypt'
import { createToken } from "./auth.utils";

const loginUser = async (payload: TLoginUser) => { 
    // check if the user exists 
    const currentUser = await User.isUserExists(payload.id)
    if (!currentUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user dose not exists!')
    }
    if (currentUser.isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user dose not exists!')
    }
    if (currentUser.status === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
    }

    // checking if the password is correct 
    const isPasswordMatch = await User.isPasswordMatch(payload?.password,
        currentUser?.password)
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password does not match!')
    }


    //create token and send it to the client

    const jwtPayload = {
        userId: currentUser?.id,
        role: currentUser?.role
    }
    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expire_time as string
    )
    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expire_time as string
    ) 

        return {
            accessToken,
            refreshToken,
            needsPasswordChange: currentUser?.needsPasswordChange
         }
}

const refreshToken = async (token: string) => {


    if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    } 
    
    //check if the token is valid 
    const decoded = jwt.verify(
        token,
        config.jwt_refresh_secret as string
    ) as JwtPayload
    
    const { userId, iat } = decoded;
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


    //create token and send it to the client

    const jwtPayload = {
        userId: currentUser?.id,
        role: currentUser?.role
    }
    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expire_time as string
    )

    return {
        accessToken
    }

}


const changePassword = async(user: JwtPayload, payload: {oldPassword: string; newPassword: string;}) => {

    // check if the user exists 
    const currentUser = await User.isUserExists(user?.userId)
    if (!currentUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user dose not exists!')
    }
    if (currentUser.isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user dose not exists!')
    }
    if (currentUser.status === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
    }

    // checking if the password is correct 
    const isPasswordMatch = await User.isPasswordMatch(payload?.oldPassword,
        currentUser?.password)
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password does not match!')
    }

    //hash new password
    const newHashPassword = await bcrypt.hash(
        payload?.newPassword,
        Number(config.bcrypt_salt),
    )

    const result = await User.findOneAndUpdate({
        id: user?.userId,
        role: user?.role
    },{
        password: newHashPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date()
    })

    return result ? 'Password changed successfully!' : null;

}

export const authServices = {
    loginUser,
    refreshToken,
    changePassword
}