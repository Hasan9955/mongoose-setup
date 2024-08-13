import express from 'express'
import { userController } from './user.controller';
import studentValidationZodSchema from '../student/student.zod.validation';
import validationRequest from '../../Middlewares/validator';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';

const router = express.Router();


router.post('/create-student', 
    validationRequest(studentValidationZodSchema), 
    userController.createStudent)
    router.post(
        '/create-faculty',
        validationRequest(createFacultyValidationSchema),
        userController.createFaculty,
      );
      
      router.post(
        '/create-admin',
        validationRequest(createAdminValidationSchema),
        userController.createAdmin,
      );
      

export const userRoutes = router;