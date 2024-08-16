"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const course_service_1 = require("./course.service");
const createCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseServices.createCourse(req.body);
    res.status(200).json({
        success: true,
        message: 'Course created Successfully.',
        data: result
    });
}));
const getAllCourses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseServices.getAllCourses(req.query);
    res.status(200).json({
        success: true,
        message: 'Courses retrieved Successfully.',
        data: result
    });
}));
const getSingleCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield course_service_1.CourseServices.getSingleCourse(id);
    res.status(200).json({
        success: true,
        message: 'Course retrieved Successfully.',
        data: result
    });
}));
const deleteCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.CourseServices.deleteCourse(id);
    res.status(200).json({
        success: true,
        message: 'Course is deleted.',
        data: result
    });
}));
const updateCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const payload = req.body;
    const result = yield course_service_1.CourseServices.updateCourse(id, payload);
    res.status(200).json({
        success: true,
        message: 'Course is updated Successfully.',
        data: result
    });
}));
//part 2 course faculties operations
const getCourseFaculties = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseServices.getCourseFaculties();
    res.status(200).json({
        success: true,
        message: 'Course faculties retrieved successfully.',
        data: result
    });
}));
const assignFacultiesIntoCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = yield course_service_1.CourseServices.assignFaculties(courseId, faculties);
    res.status(200).json({
        success: true,
        message: 'Faculties assigned successfully.',
        data: result
    });
}));
const deleteFacultiesFromCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = yield course_service_1.CourseServices.deleteFaculties(courseId, faculties);
    res.status(200).json({
        success: true,
        message: 'Delete faculties from course successfully.',
        data: result
    });
}));
exports.CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    getCourseFaculties,
    assignFacultiesIntoCourse,
    deleteFacultiesFromCourse
};
