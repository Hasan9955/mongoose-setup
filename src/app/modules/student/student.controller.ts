import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import catchAsync from '../../utility/catchAsync';
// import studentValidationJoiSchema from './student.validation';




const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudent();

    res.status(200).json({
        success: true,
        message: 'Students is retrieved successfully',
        data: { result }

    })
})


const findAStudent: RequestHandler = catchAsync(async (req, res) => {
    const {studentId} = req.params;

    const result = await StudentServices.findAStudent(studentId)

    res.status(200).json({
        success: true,
        message: 'Student is retrieved successfully',
        data: result

    })
})


const deleteAStudent: RequestHandler = catchAsync(async (req, res) => {

    const { studentId } = req.params;
    const result = await StudentServices.deleteStudent(studentId);

    res.status(200).json({
        success: true,
        message: 'Student is deleted successfully',
        data: result

    })
})


const updateAStudent: RequestHandler = catchAsync(async (req, res) => {

    const data = req.body;
    const studentId = req.params.id;

    const result = await StudentServices.updateStudent(studentId, data)
    res.status(200).json({
        success: true,
        message: 'Student is updated successfully',
        data: result

    })

})

export const StudentController = {
    getAllStudents,
    findAStudent,
    deleteAStudent,
    updateAStudent
}