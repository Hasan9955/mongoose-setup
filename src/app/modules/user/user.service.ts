import { TAcademicSemester } from './../academicSemester/academicSemester.interface';
import { TUser } from './user.interface';
import config from "../../config";
import { TStudent } from "../student/student.interface";
import { UserModel } from "./user.model";
import { StudentModel } from '../student/student.model';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';
import { Admin } from '../Admin/admin.model';
import { TFaculty } from '../Faculty/faculty.interface';
import { Faculty } from '../Faculty/faculty.model';
import { AcademicDepartmentModel } from '../AcademicDepartment/academicDepartment.model';


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

        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user.')
        }
        //set id, _id in studentData
        studentData.id = newUser[0].id;
        studentData.user = newUser[0]._id;

        //create a student (transaction-2)
        const newStudent = await StudentModel.create([studentData], { session })

        if (!newStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student.')
        }

        await session.commitTransaction();
        await session.endSession();


        return newStudent;

    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error)
    }

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



const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_pass as string);

    //set student role
    userData.role = 'faculty';

    // find academic department info
    const academicDepartment = await AcademicDepartmentModel.findById(
        payload.academicDepartment,
    );

    if (!academicDepartment) {
        throw new AppError(400, 'Academic department not found');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateFacultyId();

        // create a user (transaction-1)
        const newUser = await UserModel.create([userData], { session }); // array

        //create a faculty
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a faculty (transaction-2)

        const newFaculty = await Faculty.create([payload], { session });

        if (!newFaculty.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
        }

        await session.commitTransaction();
        await session.endSession();

        return newFaculty;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_pass as string);

    //set student role
    userData.role = 'admin';

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateAdminId();

        // create a user (transaction-1)
        const newUser = await UserModel.create([userData], { session });

        //create a admin
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a admin (transaction-2)
        const newAdmin = await Admin.create([payload], { session });

        if (!newAdmin.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
        }

        await session.commitTransaction();
        await session.endSession();

        return newAdmin;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

export const userService = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB,
}; 