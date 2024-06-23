import { TAcademicSemester } from './../academicSemester/academicSemester.interface';
import { TUser } from './user.interface';
import config from "../../config";
import { TStudent } from "../student/student.interface";
import { UserModel } from "./user.model";
import { StudentModel } from '../student/student.model';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';


const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    //create a userObject
    const userData: Partial<TUser> = {}
    //set student role
    userData.role = 'student'

    //if password is not given use default password
    userData.password = password || config.default_pass as string;


    const session = await mongoose.startSession();

    try {
        session.startTransaction()


        //find academic semester info
        const academicSemester = await AcademicSemesterModel.findById(studentData.academicSemester);

        userData.id = await generateStudentId(academicSemester as TAcademicSemester)


        //create user in DB (Transaction-1)
        const newUser = await UserModel.create([userData], { session });

        if (newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user.')
        }
            //set id, _id in studentData
            studentData.id = newUser[0].id;
            studentData.user = newUser[0]._id;

            //create a student (transaction-2)
            const newStudent = await StudentModel.create([studentData], {session})

            if(!newStudent){
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student.')
            }

            await session.commitTransaction();
            await session.endSession();


            return newStudent
        
    } catch (error) {

        await session.abortTransaction();
        await session.endSession();
        
    }








    // This is example of Mongoose built in static method.
    // if (await StudentModel.isStudentExists(studentData.id)) {
    //     throw new Error("User already exists.")
    // }

    //This is example of Mongoose built in instance method.
    // const studentInstance = new StudentModel(student)
    // if(await studentInstance.isUserExists(student.id)){
    //     throw new Error('User already exists!')
    // }
    // const result = await studentInstance.save();

}



export const userService = {
    createStudentIntoDB
}