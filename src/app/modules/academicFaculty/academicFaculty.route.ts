import express from 'express'
import { AcademicFacultyControllers } from './academicFaculty.controller';
import validationRequest from '../../Middlewares/validator';
import AcademicFacultyValidationSchema from './academicFaculty.validation';
import authValidator from '../../Middlewares/authValidator';
import { USER_ROLE } from '../user/user.constant';


const route = express.Router();

route.get('/', authValidator('admin','faculty', 'student'), AcademicFacultyControllers.getAllAcademicFaculties)

route.post('/create-academic-faculty', 
    authValidator(USER_ROLE.admin),
    validationRequest(AcademicFacultyValidationSchema),
     AcademicFacultyControllers.createAcademicFaculty)

route.get('/:id', authValidator('admin','faculty', 'student'), AcademicFacultyControllers.getSingleAcademicFaculty)

route.put('/:id', authValidator(USER_ROLE.admin), validationRequest(AcademicFacultyValidationSchema), AcademicFacultyControllers.updateAcademicFaculty)


export const academicFacultyRoutes = route;