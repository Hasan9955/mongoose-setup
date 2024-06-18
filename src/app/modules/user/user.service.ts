import { TUser } from './user.interface';
import config from "../../config";
import { TStudent } from "../student/student.interface";
import { UserModel } from "./user.model";
import { StudentModel } from '../student/student.model';


const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    //create a userObject
    const userData: Partial<TUser> = { }

    //if password is not given use default password
    userData.password = password || config.default_pass as string;

    //Generate id
    userData.id = '203010' + Math.floor(Math.random() * 1000) 

    //set role
    userData.role = 'student'

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