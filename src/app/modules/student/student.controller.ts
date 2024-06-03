import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import z from 'zod';
import studentValidationZodSchema from './student.zod.validation';
// import studentValidationJoiSchema from './student.validation';


const createStudent = async (req: Request, res: Response) => {

    try {

        const { student: studentData } = req.body;


        //chapter of joi
        //validate req.body data by joi schema. 
        // const { error, value } = studentValidationJoiSchema.validate(studentData)
        // if (error) {
        //     console.log(error);
        //     res.status(500).json({
        //         success: false, 
        //         message: 'An error is going on joi schema!!!',
        //         error: error.details
        //     })
        // } 




        //chapter of zod
        //Data validation using zod


        const zodparseData = studentValidationZodSchema.parse(studentData)


        //will call service func to send this data 

        const result = await StudentServices.createStudentIntoDB(zodparseData)

        //send response

        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result

        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'An error is going on!!!',
            error

        })

    }
}

const getAllStudents = async (req: Request, res: Response) => {
    try {

        const result = await StudentServices.getAllStudent();

        res.status(200).json({
            success: true,
            message: 'Students is retrieved successfully',
            data: { result }

        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'An error is going on!!!',
            error

        })
    }
}


const findAStudent = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const result = await StudentServices.findAStudent(id)

        res.status(200).json({
            success: true,
            message: 'Student is retrieved successfully',
            data: result

        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'An error is going on!!!',
            error

        })
    }
}


const deleteAStudent = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await StudentServices.deleteStudent(id);

        res.status(200).json({
            success: true,
            message: 'Student is deleted successfully',
            data: result

        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'An error is going on!!!',
            error
        })
    }


}


const updateAStudent = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const studentId = req.params.id;

        const result = await StudentServices.updateStudent(studentId, data)
        res.status(200).json({
            success: true,
            message: 'Student is updated successfully',
            data: result

        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'An error is going on controller!!!',
            error
        })
    }

}

export const StudentController = {
    createStudent,
    getAllStudents,
    findAStudent,
    deleteAStudent,
    updateAStudent
}