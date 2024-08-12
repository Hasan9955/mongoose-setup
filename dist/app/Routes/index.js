"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const academicSemester_route_1 = require("./../modules/academicSemester/academicSemester.route");
const user_route_1 = require("./../modules/user/user.route");
const express_1 = require("express");
const student_route_1 = require("../modules/student/student.route");
const academicFaculty_route_1 = require("../modules/academicFaculty/academicFaculty.route");
const academicDepartment_route_1 = require("../modules/AcademicDepartment/academicDepartment.route");
const todo_route_1 = require("../modules/TodoApp/todo.route");
const admin_route_1 = require("../modules/Admin/admin.route");
const faculty_route_1 = require("../modules/Faculty/faculty.route");
const couse_route_1 = require("../modules/Course/couse.route");
const router = (0, express_1.Router)();
const allRoutes = [
    {
        path: '/students',
        route: student_route_1.StudentRoutes
    },
    {
        path: '/users',
        route: user_route_1.userRoutes
    },
    {
        path: '/academic-semester',
        route: academicSemester_route_1.AcademicSemesterRoutes
    },
    {
        path: '/academic-faculty',
        route: academicFaculty_route_1.academicFacultyRoutes
    },
    {
        path: '/academic-department',
        route: academicDepartment_route_1.AcademicDepartmentRoutes
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes
    },
    {
        path: '/faculty',
        route: faculty_route_1.FacultyRoutes
    },
    {
        path: '/course',
        route: couse_route_1.CourseRoute
    },
    {
        path: '/todo',
        route: todo_route_1.todoRoutes
    }
];
allRoutes.forEach(route => router.use(route.path, route.route));
// router.use('/students', StudentRoutes);
// router.use('/users', userRoutes);
exports.default = router;
