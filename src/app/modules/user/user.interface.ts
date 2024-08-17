import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";


export interface TUser {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    passwordChangedAt: Date;
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked'
    isDeleted: boolean;
}

export interface NewUser {
    id: string,
    password: string,
    role: 'admin' | 'student' | 'faculty';
}

// This interface  for creating static methods
export interface UserModel extends Model<TUser> {

    //Method 1
    isUserExists(id: string): Promise<TUser>;
    //Method 2
    isPasswordMatch(plainTextPassword: string, hashPassword: string): Promise<boolean>;
    //Method 3
    isJwtIssuedBeforePasswordChanged (
        passwordChangedTimeStamp: Date,
        jwtIssuedTimeStamp: number
    ): boolean;


}


export type TUserRole = keyof typeof USER_ROLE;
