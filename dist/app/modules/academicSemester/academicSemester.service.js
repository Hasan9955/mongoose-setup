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
exports.AcademicSemesterServices = void 0;
const lodash_1 = require("lodash");
const academicSemester_model_1 = require("./academicSemester.model");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createAcademicSemester = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesterCodeMapper = {
        Autumn: '01',
        Summer: '02',
        Fall: '03'
    };
    if (academicSemesterCodeMapper[payload.name] !== payload.code) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Semester code invalid.');
    }
    const result = yield academicSemester_model_1.AcademicSemesterModel.create(payload);
    return result;
});
const getAllAcademicSemester = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemesterModel.find();
    return result;
});
const getAnAcademicSemester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemesterModel.findById(id);
    return result;
});
const updateAnAcademicSemester = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const findSemester = yield academicSemester_model_1.AcademicSemesterModel.findById(id);
    const mergeData = (0, lodash_1.merge)(findSemester, data);
    const result = yield academicSemester_model_1.AcademicSemesterModel.findByIdAndUpdate(id, mergeData, {
        new: true,
        runValidators: true
    });
    return result;
});
exports.AcademicSemesterServices = {
    createAcademicSemester,
    getAllAcademicSemester,
    getAnAcademicSemester,
    updateAnAcademicSemester
};
