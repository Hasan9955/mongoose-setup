import validationRequest from '../../Middlewares/validator';
import { AcademicDepartControllers } from './academicDepartment.controller';
import express from 'express';
import AcademicDepartmentValidation from './academicDepartment.validation';
import authValidator from '../../Middlewares/authValidator';
import { USER_ROLE } from '../user/user.constant';

const route = express.Router();

route.get('/', authValidator('admin','faculty', 'student'), AcademicDepartControllers.getAcademicDepartments)

route.get('/:id', authValidator('admin','faculty', 'student'), AcademicDepartControllers.getSingleAcademicDepartment);

route.post('/create-academic-department',
    authValidator(USER_ROLE.admin), 
    validationRequest(AcademicDepartmentValidation), 
    AcademicDepartControllers.createAcademicDepartment);

route.put('/:id', authValidator(USER_ROLE.admin), AcademicDepartControllers.updateAcademicDepartment);


export const AcademicDepartmentRoutes = route;
