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
exports.semesterRegistrationServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const semesterRegistration_model_1 = require("./semesterRegistration.model");
const offeredCourse_model_1 = require("../OfferedCourse/offeredCourse.model");
const createSemesterRegistration = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = payload === null || payload === void 0 ? void 0 : payload.academicSemester;
    //check if there any registered semester that is  already upcoming or ongoing;
    const isThereAnyUpcomingOrOngoingSemester = yield semesterRegistration_model_1.SemesterRegistration.findOne({
        $or: [{ status: semesterRegistration_constant_1.registrationStatus.UPCOMING }, { status: semesterRegistration_constant_1.registrationStatus.ONGOING }]
    });
    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester!`);
    }
    //check is academic semester exists
    const isAcademicSemesterExists = yield academicSemester_model_1.AcademicSemesterModel.findById(academicSemester);
    if (!isAcademicSemesterExists) {
        throw new Error('This academic semester is not exists.');
    }
    //check is semester already registered
    const isSemesterAlreadyRegistered = yield semesterRegistration_model_1.SemesterRegistration.findOne({
        academicSemester
    });
    if (isSemesterAlreadyRegistered) {
        throw new Error('This semester is already registered');
    }
    const result = yield semesterRegistration_model_1.SemesterRegistration.create(payload);
    return result;
});
const getAllSemesterRegistrations = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const getSemesterRegistrations = new QueryBuilder_1.default(semesterRegistration_model_1.SemesterRegistration.find()
        .populate('academicSemester'), query)
        .search(semesterRegistration_constant_1.semesterRegistrationSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield getSemesterRegistrations.modelQuery;
    return result;
});
const getSingleSemesterRegistration = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_model_1.SemesterRegistration.findById(id);
    return result;
});
const updateSemesterRegistration = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const requestedSemesterRegistration = yield semesterRegistration_model_1.SemesterRegistration.findById(id);
    //check is semester is exists
    if (!requestedSemesterRegistration) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Requested semester is not found.');
    }
    const currentSemesterStatus = requestedSemesterRegistration === null || requestedSemesterRegistration === void 0 ? void 0 : requestedSemesterRegistration.status;
    const requestedSemesterStatus = payload === null || payload === void 0 ? void 0 : payload.status;
    //if the requested semester is ended we will not update anything
    if (currentSemesterStatus === semesterRegistration_constant_1.registrationStatus.ENDED) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `This semester registration is already ${currentSemesterStatus}`);
    }
    //  UPCOMING --> ONGOING --> ENDED
    if (currentSemesterStatus === semesterRegistration_constant_1.registrationStatus.UPCOMING && requestedSemesterStatus === semesterRegistration_constant_1.registrationStatus.ENDED) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Your can not directly change status from ${currentSemesterStatus} to ${requestedSemesterStatus}`);
    }
    if (currentSemesterStatus === semesterRegistration_constant_1.registrationStatus.ONGOING && requestedSemesterStatus === semesterRegistration_constant_1.registrationStatus.UPCOMING) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Your can not directly change status from ${currentSemesterStatus} to ${requestedSemesterStatus}`);
    }
    const result = yield semesterRegistration_model_1.SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });
    return result;
});
const deleteSemesterRegistration = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isSemesterRegistrationExists = yield semesterRegistration_model_1.SemesterRegistration.findById(id);
    if (!isSemesterRegistrationExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Requested semester registration is not found.');
    }
    // Delete all offered courses under this registered semester
    const deleteOfferedCoursesUnderThisSemester = yield offeredCourse_model_1.OfferedCourse.deleteMany({
        semesterRegistration: id
    });
    // now delete the registered semester
    const result = yield semesterRegistration_model_1.SemesterRegistration.findByIdAndDelete(id);
    return result;
});
exports.semesterRegistrationServices = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
    deleteSemesterRegistration
};
