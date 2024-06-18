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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const student_service_1 = require("./student.service");
// import studentValidationJoiSchema from './student.validation';
const getAllStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getAllStudent();
        res.status(200).json({
            success: true,
            message: 'Students is retrieved successfully',
            data: { result }
        });
    }
    catch (error) {
        next(error);
    }
});
const findAStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield student_service_1.StudentServices.findAStudent(id);
        res.status(200).json({
            success: true,
            message: 'Student is retrieved successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteAStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield student_service_1.StudentServices.deleteStudent(id);
        res.status(200).json({
            success: true,
            message: 'Student is deleted successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const updateAStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const studentId = req.params.id;
        const result = yield student_service_1.StudentServices.updateStudent(studentId, data);
        res.status(200).json({
            success: true,
            message: 'Student is updated successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
exports.StudentController = {
    getAllStudents,
    findAStudent,
    deleteAStudent,
    updateAStudent
};
