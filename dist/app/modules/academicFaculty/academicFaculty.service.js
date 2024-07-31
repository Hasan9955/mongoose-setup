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
exports.AcademicFacultyServices = void 0;
const lodash_1 = require("lodash");
const academicFaculty_model_1 = require("./academicFaculty.model");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const createAcademicFaculty = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFacultyModel.create(payload);
    return result;
});
const getAllAcademicFaculties = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFacultyModel.find();
    return result;
});
const getSingleAcademicFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFacultyModel.findById(id);
    return result;
});
const updateAcademicFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const facultyData = yield academicFaculty_model_1.AcademicFacultyModel.findById(id);
    if (!facultyData) {
        throw new AppError_1.default(404, 'This Faculty Data is not found.');
    }
    const mergedData = (0, lodash_1.merge)(facultyData, payload);
    const result = yield academicFaculty_model_1.AcademicFacultyModel.findByIdAndUpdate(id, mergedData, {
        runValidators: true,
        new: true
    });
    return result;
});
exports.AcademicFacultyServices = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty
};
