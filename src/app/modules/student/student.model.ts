import { Schema, model, connect } from 'mongoose';
import { Student, UserName, Guardian, LocalGuardian } from './student.interface';


const userNameSchema = new Schema<UserName>({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true }

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
    id: { type: String },
    name: userNameSchema,
    gender: ['male', 'female'],
    email: { type: String },
    dateOfBirth: { type: String },
    contactNumber: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: { type: String },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    studentStatus: ['active', 'blocked'],
    profilePic: String
})



export const StudentModel = model<Student>('Student', StudentSchema);