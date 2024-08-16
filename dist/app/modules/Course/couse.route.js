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
const router = express_1.default.Router();
router.post('/create-course', (0, validator_1.default)(course_validation_1.CourseValidations.createCourseValidationSchema), course_controller_1.CourseController.createCourse);
router.patch('/:id', (0, validator_1.default)(course_validation_1.CourseValidations.updateCourseValidationSchema), course_controller_1.CourseController.updateCourse);
router.get('/', course_controller_1.CourseController.getAllCourses);
router.get('/:id', course_controller_1.CourseController.getSingleCourse);
router.delete('/:id', course_controller_1.CourseController.deleteCourse);
// 2nd CourseFaculties routes
router.get('/getCourseFaculties', course_controller_1.CourseController.getCourseFaculties);
router.put('/:courseId/assign-faculties', course_controller_1.CourseController.assignFacultiesIntoCourse);
router.delete('/:courseId/delete-faculties', course_controller_1.CourseController.deleteFacultiesFromCourse);
exports.CourseRoute = router;
