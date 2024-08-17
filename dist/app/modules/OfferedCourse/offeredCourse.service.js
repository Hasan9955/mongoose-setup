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
exports.offeredCourseServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const semesterRegistration_model_1 = require("./../SemesterRegistration/semesterRegistration.model");
const offeredCourse_model_1 = require("./offeredCourse.model");
const academicFaculty_model_1 = require("../academicFaculty/academicFaculty.model");
const academicDepartment_model_1 = require("../AcademicDepartment/academicDepartment.model");
const faculty_model_1 = require("../Faculty/faculty.model");
const course_model_1 = require("../Course/course.model");
const offeredCourse_utils_1 = require("./offeredCourse.utils");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const offeredCourse_constant_1 = require("./offeredCourse.constant");
const createOfferedCourse = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty, section, days, startTime, endTime } = payload;
    //check is the semesterRegistration id is exists
    const isSemesterRegistrationExists = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Semester registration id is  not exists');
    }
    const isAcademicFacultyExists = yield academicFaculty_model_1.AcademicFacultyModel.findById(academicFaculty);
    if (!isAcademicFacultyExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Academic Faculty is  not exists');
    }
    const currentAcademicDepartment = yield academicDepartment_model_1.AcademicDepartmentModel.findById(academicDepartment);
    if (!currentAcademicDepartment) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Academic Department is  not exists');
    }
    const isCourseExists = yield course_model_1.Course.findById(course);
    if (!isCourseExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Course is  not exists');
    }
    const isFacultyExists = yield faculty_model_1.Faculty.findById(faculty);
    if (!isFacultyExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Faculty is  not exists');
    }
    //check if the department is belong to faculty 
    const isDepartmentBelongToFaculty = ((_a = currentAcademicDepartment === null || currentAcademicDepartment === void 0 ? void 0 : currentAcademicDepartment.academicFaculty) === null || _a === void 0 ? void 0 : _a.toString()) === academicFaculty.toString();
    if (!isDepartmentBelongToFaculty) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `This ${currentAcademicDepartment.name} is not belong to this ${isAcademicFacultyExists.name}`);
    }
    //check if the same offered course same section in same registered semester exists
    const isSameOfferedCourseExistsWithSameSectionWithSameRegisteredSemester = yield offeredCourse_model_1.OfferedCourse.findOne({
        semesterRegistration,
        course,
        section
    });
    if (isSameOfferedCourseExistsWithSameSectionWithSameRegisteredSemester) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Offered course with same section is already exists.');
    }
    //get the schedules of current faculty
    const assignedSchedules = yield offeredCourse_model_1.OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select('days startTime endTime');
    const newSchedule = {
        days,
        startTime,
        endTime
    };
    if ((0, offeredCourse_utils_1.hasTimeConflict)(assignedSchedules, newSchedule)) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'This faculty is not available at that time! Choose another time or day.');
    }
    const academicSemester = isSemesterRegistrationExists === null || isSemesterRegistrationExists === void 0 ? void 0 : isSemesterRegistrationExists.academicSemester;
    const result = yield offeredCourse_model_1.OfferedCourse.create(Object.assign(Object.assign({}, payload), { academicSemester }));
    return result;
});
const getOfferedCourses = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const getOfferedCourse = new QueryBuilder_1.default(offeredCourse_model_1.OfferedCourse.find()
        .populate('semesterRegistration')
        .populate('academicSemester')
        .populate('academicFaculty')
        .populate('academicDepartment')
        .populate('course')
        .populate('faculty'), query)
        .search(offeredCourse_constant_1.offeredCourseSearchableFields)
        .sort()
        .paginate()
        .filter()
        .fields();
    const result = yield getOfferedCourse.modelQuery;
    return result;
});
const getSingleOfferedCourses = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_model_1.OfferedCourse.findById(id)
        .populate('semesterRegistration')
        .populate('academicSemester')
        .populate('academicFaculty')
        .populate('academicDepartment')
        .populate('course')
        .populate('faculty');
    return result;
});
const UpdateOfferedCourses = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { faculty, startTime, endTime, days } = payload;
    const isOfferedCourseExists = yield offeredCourse_model_1.OfferedCourse.findById(id);
    if (!isOfferedCourseExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Offered Course is  not exists');
    }
    const isFacultyExists = yield faculty_model_1.Faculty.findById(faculty);
    if (!isFacultyExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Faculty is  not exists');
    }
    const semesterRegistrationId = isOfferedCourseExists.semesterRegistration;
    const semesterRegistrationStatus = yield semesterRegistration_model_1.SemesterRegistration.findById(semesterRegistrationId);
    if ((semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status) !== 'UPCOMING') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `You can not update offered course as it is ${semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status}`);
    }
    //get the schedules of current faculty
    const assignedSchedules = yield offeredCourse_model_1.OfferedCourse.find({
        semesterRegistration: semesterRegistrationId,
        faculty,
        days: { $in: days }
    }).select('days startTime endTime');
    const newSchedule = {
        days,
        startTime,
        endTime
    };
    if ((0, offeredCourse_utils_1.hasTimeConflict)(assignedSchedules, newSchedule)) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'This faculty is not available at that time! Choose another time or day.');
    }
    const result = yield offeredCourse_model_1.OfferedCourse.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });
    return result;
});
exports.offeredCourseServices = {
    createOfferedCourse,
    getOfferedCourses,
    getSingleOfferedCourses,
    UpdateOfferedCourses
};
