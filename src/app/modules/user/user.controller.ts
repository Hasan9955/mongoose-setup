import { NextFunction, Request, Response } from 'express'; 
import { userService } from './user.service';
import sendResponse from '../../utility/sendResponse';
import httpStatus from 'http-status';



const createStudent = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { password, student: studentData } = req.body;


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


        // const zodparseData = studentValidationZodSchema.parse(studentData)


        //will call service func to send this data 

        const result = await userService.createStudentIntoDB(
            password, 
            studentData
        ) 
        
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student is created successfully',
            data: result
        })
    } catch (error) { 
        next(error)
    }
}


export const userController = {
    createStudent
}