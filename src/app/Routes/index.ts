import { AcademicSemesterRoutes } from './../modules/academicSemester/academicSemester.route';
import { userRoutes } from './../modules/user/user.route';
import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/AcademicDepartment/academicDepartment.route';

const router = Router();

const allRoutes = [
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/academic-semester',
        route: AcademicSemesterRoutes
    },
    {
        path: '/academic-faculty',
        route: academicFacultyRoutes
    },
    {
        path: '/academic-department',
        route: AcademicDepartmentRoutes
    }
]

allRoutes.forEach(route => router.use(route.path, route.route))
// router.use('/students', StudentRoutes);
// router.use('/users', userRoutes);


export default router;