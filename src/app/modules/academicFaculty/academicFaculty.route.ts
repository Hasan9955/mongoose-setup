import express from 'express'
import { AcademicFacultyControllers } from './academicFaculty.controller';


const route = express.Router();

route.get('/', AcademicFacultyControllers.getAllAcademicFaculties)

route.post('/create-academic-faculty', AcademicFacultyControllers.createAcademicFaculty)

route.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculty)

route.put('/:id', AcademicFacultyControllers.updateAcademicFaculty)


export const academicFacultyRoutes = route;