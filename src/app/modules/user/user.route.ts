import express from 'express'
import { userController } from './user.controller';
import studentValidationZodSchema from '../student/student.zod.validation';
import validationRequest from '../../Middlewares/validator';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import authValidator from '../../Middlewares/authValidator';
import { USER_ROLE } from './user.constant';

const router = express.Router();


router.post('/create-student',
  authValidator(USER_ROLE.admin),
  validationRequest(studentValidationZodSchema),
  userController.createStudent)


router.post(
  '/create-faculty',
  authValidator(USER_ROLE.admin),
  validationRequest(createFacultyValidationSchema),
  userController.createFaculty,
);


router.post(
  '/create-admin',
  authValidator(USER_ROLE.admin),
  validationRequest(createAdminValidationSchema),
  userController.createAdmin,
);


export const userRoutes = router;