import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import z from 'zod';
import studentValidationZodSchema from './student.zod.validation';
// import studentValidationJoiSchema from './student.validation';




const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const result = await StudentServices.getAllStudent();

        res.status(200).json({
            success: true,
            message: 'Students is retrieved successfully',
            data: { result }

        })
    } catch (error) {
        next(error)
     }
}


const findAStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const result = await StudentServices.findAStudent(id)

        res.status(200).json({
            success: true,
            message: 'Student is retrieved successfully',
            data: result

        })
    } catch (error) {
        next(error)
     }
}


const deleteAStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const result = await StudentServices.deleteStudent(id);

        res.status(200).json({
            success: true,
            message: 'Student is deleted successfully',
            data: result

        })
    } catch (error) {
        next(error)
     }


}


const updateAStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const studentId = req.params.id;

        const result = await StudentServices.updateStudent(studentId, data)
        res.status(200).json({
            success: true,
            message: 'Student is updated successfully',
            data: result

        })
    } catch (error) {
       next(error)
    }

}

export const StudentController = { 
    getAllStudents,
    findAStudent,
    deleteAStudent,
    updateAStudent
}