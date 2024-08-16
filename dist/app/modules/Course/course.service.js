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
exports.CourseServices = void 0;
const lodash_1 = require("lodash");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_constant_1 = require("./course.constant");
const course_model_1 = require("./course.model");
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createCourse = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.create(payload);
    return result;
});
const getAllCourses = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const getCourses = new QueryBuilder_1.default(course_model_1.Course.find()
        .populate('preRequisiteCourses.course'), query)
        .search(course_constant_1.CourseSearchAbleFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield getCourses.modelQuery;
    return result;
});
const getSingleCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById(id)
        .populate('preRequisiteCourses.course');
    return result;
});
const updateCourse = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const courseData = yield course_model_1.Course.findById(id);
        if (!courseData) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid Id given.');
        }
        const mergeData = (0, lodash_1.merge)(courseData, payload);
        const mapData = mergeData.preRequisiteCourses.filter(el => el.course && !el.isDeleted);
        mergeData.preRequisiteCourses = mapData;
        const result = yield course_model_1.Course.findByIdAndUpdate(id, mergeData, {
            new: true,
            validator: true,
            session
        });
        if (!result) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update course.');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const deleteCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true
    });
    return result;
});
//part 2 Course Faculties model operations
const getCourseFaculties = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.find({});
    return result;
});
const assignFaculties = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        course: id,
        $addToSet: { faculties: { $each: payload } }
    }, {
        upsert: true,
        new: true
    });
    return result;
});
const deleteFaculties = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        $pull: { faculties: { $in: payload } }
    }, {
        new: true
    });
    return result;
});
exports.CourseServices = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    getCourseFaculties,
    assignFaculties,
    deleteFaculties
};
