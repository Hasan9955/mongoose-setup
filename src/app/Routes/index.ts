import { AcademicSemesterRoutes } from './../modules/academicSemester/academicSemester.route';
import { userRoutes } from './../modules/user/user.route';
import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/AcademicDepartment/academicDepartment.route';
import { todoRoutes } from '../modules/TodoApp/todo.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';
import { CourseRoute } from '../modules/Course/couse.route';
import { semesterRegistrationRoutes } from '../modules/SemesterRegistration/semesterRegistration.route';

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
    },
    {
        path: '/admin',
        route: AdminRoutes
    },
    {
        path: '/faculty',
        route: FacultyRoutes
    },
    {
        path: '/course',
        route: CourseRoute
    },
    {
        path: '/semester-registration',
        route: semesterRegistrationRoutes
    },
    {
        path: '/todo',
        route: todoRoutes
    }
]

allRoutes.forEach(route => router.use(route.path, route.route))
// router.use('/students', StudentRoutes);
// router.use('/users', userRoutes);


export default router;