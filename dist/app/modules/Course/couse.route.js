"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoute = void 0;
const express_1 = __importDefault(require("express"));
const validator_1 = __importDefault(require("../../Middlewares/validator"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const authValidator_1 = __importDefault(require("../../Middlewares/authValidator"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post('/create-course', (0, authValidator_1.default)(user_constant_1.USER_ROLE.admin), (0, validator_1.default)(course_validation_1.CourseValidations.createCourseValidationSchema), course_controller_1.CourseController.createCourse);
router.patch('/:id', (0, authValidator_1.default)(user_constant_1.USER_ROLE.admin), (0, validator_1.default)(course_validation_1.CourseValidations.updateCourseValidationSchema), course_controller_1.CourseController.updateCourse);
router.get('/', (0, authValidator_1.default)('admin', 'faculty', 'student'), course_controller_1.CourseController.getAllCourses);
router.get('/:id', (0, authValidator_1.default)('admin', 'faculty', 'student'), course_controller_1.CourseController.getSingleCourse);
router.delete('/:id', (0, authValidator_1.default)(user_constant_1.USER_ROLE.admin), course_controller_1.CourseController.deleteCourse);
// 2nd CourseFaculties routes
router.get('/getCourseFaculties', (0, authValidator_1.default)(user_constant_1.USER_ROLE.admin), course_controller_1.CourseController.getCourseFaculties);
router.put('/:courseId/assign-faculties', (0, authValidator_1.default)(user_constant_1.USER_ROLE.admin), course_controller_1.CourseController.assignFacultiesIntoCourse);
router.delete('/:courseId/delete-faculties', (0, authValidator_1.default)(user_constant_1.USER_ROLE.admin), course_controller_1.CourseController.deleteFacultiesFromCourse);
exports.CourseRoute = router;
