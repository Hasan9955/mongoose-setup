import { Schema, model, connect } from 'mongoose';
import { Student, UserName, Guardian, LocalGuardian } from './student.interface';
import validator from 'validator'

const userNameSchema = new Schema<UserName>({
    firstName: {
        type: String,
        // trim property will remove the string spaces
        trim: true,
         required: [true, 'First name is required'],
         validate: {
            validator: function(value: string) {  
                const firstCarCapital = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()  
                return value === firstCarCapital 
             },
             message: '{VALUE} is not capitalize!'
         }
    },
    middleName: {
         type: String 
        },
    lastName: {
         type: String,
          required: [true, 'Last name is required'],
          validate: {
            validator: (value: string) => validator.isAlpha(value),
            message: "{VALUE} is not valid value." 
          }
        }

})


const guardianSchema = new Schema<Guardian>({
    fatherName: String,
    fatherOccupation: String,
    fatherContactNo: String,
    motherName: String,
    motherOccupation: String,
    motherContactNo: String,
})

const localGuardianSchema = new Schema<LocalGuardian>({
    name: String,
    occupation: String,
    contactNo: String,
    address: String,
})



const StudentSchema = new Schema<Student>({
    id: { type : String , unique : true, required : true },
    name: {
        type: userNameSchema,
        required: true
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: "{VALUE} is not supported. The gender filed can be one of the following: 'male', 'female' or 'other'",

        },
        required: [true, 'Gender is required']
    },
    email: {
         type: String,
         validate: {
            validator: (value: string) => validator.isEmail(value),
            message: "{VALUE} is not valid email."
         }
        },
    dateOfBirth: { type: String },
    contactNumber: {
        type: String,
        minlength: [11, 'The length of ContactNO should be 11'],
        maxlength: [11, 'The length of ContactNO should be 11'],
        required: [true, 'ContactNO is required!' ]
       },
    emergencyContactNo:  {
        type: String,
        minlength: [11, 'The length of ContactNO should be 11'],
        maxlength: [11, 'The length of ContactNO should be 11'],
        required: [true, 'ContactNO is required!' ]
       },
    bloodGroup: { type: String },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    guardian: {
        type: guardianSchema,
        required: true
    },
    localGuardian: {
        type: localGuardianSchema,
        required: true
    },
    studentStatus: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
    profilePic: String
})



export const StudentModel = model<Student>('Student', StudentSchema);