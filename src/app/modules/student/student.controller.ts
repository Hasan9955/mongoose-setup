import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import z from 'zod';
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
        //create a schema validation using zod
        const studentValidationZodSchema = z.object({
            id: z.string(),
            name: z.object({
                firstName: z.string()
                .max(10,
                    {
                        message: 'firstName can not be more then 10 character'
                    },
                ),
                middleName: z.string()
            })
        })






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
        res.status(500).json({
            success: false,
            message: 'An error is going on!!!', 
            error

        })

    }
}

const getAllStudents = async (req: Request, res: Response) => {
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


const findAStudent = async (req: Request, res: Response) => {
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