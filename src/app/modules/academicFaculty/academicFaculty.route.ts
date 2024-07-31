import express from 'express'
import { AcademicFacultyControllers } from './academicFaculty.controller';
import validationRequest from '../../Middlewares/validator';
import AcademicFacultyValidationSchema from './academicFaculty.validation';


const route = express.Router();

route.get('/', AcademicFacultyControllers.getAllAcademicFaculties)

route.post('/create-academic-faculty', 
    validationRequest(AcademicFacultyValidationSchema),
     AcademicFacultyControllers.createAcademicFaculty)

route.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculty)

route.put('/:id', validationRequest(AcademicFacultyValidationSchema), AcademicFacultyControllers.updateAcademicFaculty)


export const academicFacultyRoutes = route;