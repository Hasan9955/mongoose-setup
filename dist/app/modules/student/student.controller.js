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
exports.StudentController = void 0;
const student_service_1 = require("./student.service");
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
// import studentValidationJoiSchema from './student.validation';
const getAllStudents = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield student_service_1.StudentServices.getAllStudent(query);
    res.status(200).json({
        success: true,
        message: 'Students is retrieved successfully',
        data: { result }
    });
}));
const findAStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const result = yield student_service_1.StudentServices.findAStudent(studentId);
    res.status(200).json({
        success: true,
        message: 'Student is retrieved successfully',
        data: result
    });
}));
const deleteAStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const result = yield student_service_1.StudentServices.deleteStudent(studentId);
    res.status(200).json({
        success: true,
        message: 'Student is deleted successfully',
        data: result
    });
}));
const updateAStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const studentId = req.params.id;
    const result = yield student_service_1.StudentServices.updateStudent(studentId, data);
    res.status(200).json({
        success: true,
        message: 'Student is updated successfully',
        data: result
    });
}));
exports.StudentController = {
    getAllStudents,
    findAStudent,
    deleteAStudent,
    updateAStudent
};
