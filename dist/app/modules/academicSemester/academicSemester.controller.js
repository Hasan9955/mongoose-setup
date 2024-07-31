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
exports.AcademicSemesterControllers = void 0;
const academicSemester_service_1 = require("./academicSemester.service");
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const createAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_service_1.AcademicSemesterServices.createAcademicSemester(req.body);
    res.status(200).json({
        success: true,
        message: 'Academic Semester created successfully.',
        data: result
    });
}));
const getAllAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_service_1.AcademicSemesterServices.getAllAcademicSemester();
    res.status(200).json({
        success: true,
        message: 'All Academic Semesters retrieved successfully.',
        data: result
    });
}));
const getAnAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicSemester_service_1.AcademicSemesterServices.getAnAcademicSemester(id);
    res.status(200).json({
        success: true,
        message: 'Academic Semester retrieved successfully.',
        data: result
    });
}));
const updateAnAcademicSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield academicSemester_service_1.AcademicSemesterServices.updateAnAcademicSemester(id, data);
    res.status(200).json({
        success: true,
        message: 'Academic Semester updated successfully.',
        data: result
    });
}));
exports.AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemester,
    getAnAcademicSemester,
    updateAnAcademicSemester
};
