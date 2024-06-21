import { userRoutes } from './../modules/user/user.route';
import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

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
        path: '/academic',
        route: AcademicSemesterRoutes
    }
]

allRoutes.forEach(route => router.use(route.path, route.route))
// router.use('/students', StudentRoutes);
// router.use('/users', userRoutes);


export default router;