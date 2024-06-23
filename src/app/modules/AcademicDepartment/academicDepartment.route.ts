import validationRequest from '../../Middlewares/validator';
import { AcademicDepartControllers } from './academicDepartment.controller';
import express from 'express';
import AcademicDepartmentValidation from './academicDepartment.validation';

const route = express.Router();

route.get('/', AcademicDepartControllers.getAcademicDepartments)

route.get('/:id', AcademicDepartControllers.getSingleAcademicDepartment);

route.post('/create-academic-department', validationRequest(AcademicDepartmentValidation), AcademicDepartControllers.createAcademicDepartment);

route.put('/:id', AcademicDepartControllers.updateAcademicDepartment);


export const AcademicDepartmentRoutes = route;
