import { TAcademicSemester } from './../academicSemester/academicSemester.interface';
import { TUser } from './user.interface';
import config from "../../config";
import { TStudent } from "../student/student.interface";
import { UserModel } from "./user.model";
import { StudentModel } from '../student/student.model';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utils';


const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    //create a userObject
    const userData: Partial<TUser> = { }
    //set student role
    userData.role = 'student'

    //if password is not given use default password
    userData.password = password || config.default_pass as string;

    //find academic semester info
    const admissionSemester = await AcademicSemesterModel.findById(studentData.admissionSemester);

    userData.id = await generateStudentId(admissionSemester as TAcademicSemester)

    //create user in DB
    const newUser = await UserModel.create(userData);

    if(Object.keys(newUser).length){
        //set id, _id in studentData
        studentData.id = newUser.id;
        studentData.user = newUser._id;

        //create student
        const newStudent = await StudentModel.create(studentData)
        return newStudent
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