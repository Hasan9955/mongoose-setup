import { Student } from './student.interface';
import { StudentModel } from './student.model';



const createStudentIntoDB = async(student: Student) =>{

    const result = await StudentModel.create(student);

    return result;
}

const getAllStudent = async () =>{
    const result = await StudentModel.find()
    return result;
}


const findAStudent = async (reqId: string) =>{
    const result = await StudentModel.findOne({id: reqId})

    return result;
}


export const StudentServices = {
    createStudentIntoDB,
    getAllStudent,
    findAStudent
}