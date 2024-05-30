import { Request, Response } from 'express';
import { StudentServices } from './student.service';



const createStudent = async (req: Request, res: Response) => {

    try {
        const { student: studentData } = req.body;

        //will call service func to send this data 

        const result = await StudentServices.createStudentIntoDB(studentData)

        //send response

        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result

        })
    } catch (error) {

        console.log(error);

    }
}

const getAllStudents = async (req: Request, res: Response) =>{
    try {

        const result = await StudentServices.getAllStudent()

        res.status(200).json({
            success: true,
            message: 'Student is retrieved successfully',
            data: result

        })
    } catch (error) {
        console.log(error);
        
    }
}


const findAStudent = async (req: Request, res: Response) =>{
    const id = req.params.id;

    const result = await StudentServices.findAStudent(id)
    
    res.status(200).json({
        success: true,
        message: 'Student is retrieved successfully',
        data: result

    })

}

export const StudentController = {
    createStudent,
    getAllStudents,
    findAStudent
}