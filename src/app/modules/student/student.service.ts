// import deepMerge from '../../utility/deepMerge';
import { TStudent } from './student.interface';
import { StudentModel } from './student.model';
import { merge } from 'lodash'


const createStudentIntoDB = async (studentData: TStudent) => {

    // This is example of Mongoose built in static method.
    if (await StudentModel.isStudentExists(studentData.id)) {
        throw new Error("User already exists.")
    }

    const result = await StudentModel.create(studentData);


    //This is example of Mongoose built in instance method.
    // const studentInstance = new StudentModel(student)
    // if(await studentInstance.isUserExists(student.id)){
    //     throw new Error('User already exists!')
    // }
    // const result = await studentInstance.save();



    return result;
}

const getAllStudent = async () => {
    const result = await StudentModel.find()
    return result;
}


const findAStudent = async (reqId: string) => {
    // const result = await StudentModel.findOne({ id: reqId })

    //get result by using aggritation.
    const result = await StudentModel.aggregate([
        { $match: { id: reqId } }
    ])

    return result;
}

const deleteStudent = async (reqId: string) => {
    const result = await StudentModel.updateOne({ id: reqId }, {
        isDeleted: true
    })

    return result;
}

const updateStudent = async (id: string, data: Object) => {

    const student = await StudentModel.findOne({ id: id })

    if (!student) {
        throw new Error('Student is not exists!')
    }


    //Method: 1
    //update student by lodash
    const mergeUpdate = merge(student, data)
    const result = await StudentModel.findOneAndUpdate({ id: id }, mergeUpdate, {
        new: true,
        runValidators: true
    })

    //Method: 2
    //update student by our utility deepMerge function
    // const mergeUpdate = deepMerge(student, data)
    // console.log(mergeUpdate);
    // const result = await StudentModel.findOneAndUpdate({ id: id }, mergeUpdate, {
    //     new: true,
    //     runValidators: true
    // }) 

    
    //Method: 3
    //update by updateOne
    // const result = await StudentModel.updateOne({ id: id }, {
    //     $set: {
    //         name: {
    //             firstName: data.name.firstName ? data.name.firstName : "",
    //             middleName: data.name.middleName,
    //             lastName: data.name.lastName
    //         },
    //         password: data.password,
    //         gender: data.gender,
    //         contactNumber: data.contactNumber,
    //         email: data.email,
    //         studentStatus: data.studentStatus
    //     }
    // })

    return result;
}


export const StudentServices = {
    createStudentIntoDB,
    getAllStudent,
    findAStudent,
    deleteStudent,
    updateStudent
}