import {RequestHandler} from 'express'; 
import { userService } from './user.service';
import sendResponse from '../../utility/sendResponse';
import httpStatus from 'http-status'; 
import catchAsync from '../../utility/catchAsync';


const createStudent: RequestHandler = catchAsync(async (req, res) => { 
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
})

const createFaculty = catchAsync(async (req, res) => {
    const { password, faculty: facultyData } = req.body;
  
    const result = await userService.createFacultyIntoDB(password, facultyData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty is created successfully',
      data: result,
    });
  });
  
  const createAdmin = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;
  
    const result = await userService.createAdminIntoDB(password, adminData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin is created successfully',
      data: result,
    });
  });
  
  export const userController = {
    createStudent,
    createFaculty,
    createAdmin,
  };