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
const student_zod_validation_1 = __importDefault(require("./student.zod.validation"));
// import studentValidationJoiSchema from './student.validation';
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student: studentData } = req.body;
        //chapter of joi
        //validate req.body data by joi schema. 
        // const { error, value } = studentValidationJoiSchema.validate(studentData)
        // if (error) {
        //     console.log(error);
        //     res.status(500).json({
        //         success: false, 
        //         message: 'An error is going on joi schema!!!',
        //         error: error.details
        //     })
        // } 
        //chapter of zod
        //Data validation using zod
        const zodparseData = student_zod_validation_1.default.parse(studentData);
        //will call service func to send this data 
        const result = yield student_service_1.StudentServices.createStudentIntoDB(zodparseData);
        //send response
        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error is going on!!!',
            error
        });
    }
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getAllStudent();
        res.status(200).json({
            success: true,
            message: 'Student is retrieved successfully',
            data: result
        });
    }
    catch (error) {
        console.log(error);
    }
});
const findAStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield student_service_1.StudentServices.findAStudent(id);
    res.status(200).json({
        success: true,
        message: 'Student is retrieved successfully',
        data: result
    });
});
exports.StudentController = {
    createStudent,
    getAllStudents,
    findAStudent
};
