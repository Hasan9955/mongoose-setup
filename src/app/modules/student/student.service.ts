import { UserModel } from './../user/user.model';
import httpStatus from 'http-status';
// import deepMerge from '../../utility/deepMerge';
import mongoose from 'mongoose';
import AppError from '../../Errors/AppError';
import { TStudent } from './student.interface';
import { StudentModel } from './student.model';
import { merge } from 'lodash'




const getAllStudent = async () => {
    const result = await StudentModel.find()
        .populate('user')
        .populate('academicSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty'
            }
        })
    return result;
}


const findAStudent = async (id: string) => {
    // const result = await StudentModel.findOne({ id: reqId })

    //get result by using aggritation.
    const result = await StudentModel.findOne({ id })
        .populate('user')
        .populate('academicSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty'
            }
        })

    return result;
}

const deleteStudent = async (id: string) => {

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedStudent = await StudentModel.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session }
        )

        if (!deletedStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student.')
        }


        const deleteUser = await UserModel.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session }
        )

        if (!deleteUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user.')
        }

        await session.commitTransaction();
        await session.endSession();

        return { deleteStudent, deleteUser }

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, 'Failed to delete student.')
    }


}

const updateStudent = async (id: string, data: TStudent) => {

    const student = await StudentModel.findOne({ id })

    if (!student) {
        throw new AppError(404, 'Student is not exists!')
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
    getAllStudent,
    findAStudent,
    deleteStudent,
    updateStudent
}