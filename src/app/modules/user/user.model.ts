import config from '../../config';
import { TUser } from './user.interface';
import { Schema, model } from 'mongoose'; 
import bcrypt from 'bcrypt' 

const UserSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'password should be at last 6 character']
    },
    needsPasswordChange:{
        type: Boolean,
        default: true
    },
    role:{
        type: String,
        enum: ['admin' , 'student' , 'faculty']
    },
    status: {
        type: String,
        enum: ['in-progress' , 'blocked'],
        default: 'in-progress'
    },
    isDeleted:{
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


export const UserModel = model<TUser>('user', UserSchema)

