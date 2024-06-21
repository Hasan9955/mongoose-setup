import express from 'express'
import { userController } from './user.controller';
import studentValidationZodSchema from '../student/student.zod.validation';
import validationRequest from '../../Middlewares/validator';

const router = express.Router();


router.post('/create-student', validationRequest(studentValidationZodSchema), userController.createStudent)


export const userRoutes = router;