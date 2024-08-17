import config from '../../config';
import { TUser, UserModel } from './user.interface';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt'

const UserSchema = new Schema<TUser, UserModel>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: 0,
        minLength: [6, 'password should be at last 6 character']
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    passwordChangedAt: {
        type: Date,

    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty']
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });

//pre save middleware
UserSchema.pre('save', async function (next) {
    // console.log(this, 'pre hook we will save the data');

    const user = this; //this raper the currently processing document.  
    //hashing password and save into db
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt),
    )
    next();
});


//post save middleware
UserSchema.post('save', function (doc, next) {
    // console.log(this, 'Post hook we saved our data');

    doc.password = ''// we have empty string the password
    next();
});

UserSchema.statics.isUserExists = async function(id: string) {
    return await User.findOne({ id }).select('+password')
}

UserSchema.statics.isPasswordMatch = async function (plainTextPassword: string, hashPassword) {
    return await bcrypt.compare(plainTextPassword,
        hashPassword)
}

UserSchema.statics.isJwtIssuedBeforePasswordChanged = function (passwordChangedTimeStamp: Date, jwtIssuedTimeStamp: number) {
    const passwordChangedTime = new Date(passwordChangedTimeStamp).getTime() / 1000;
    
    return passwordChangedTime > jwtIssuedTimeStamp;
}


export const User = model<TUser, UserModel>('user', UserSchema)

