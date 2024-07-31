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
exports.userService = void 0;
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const student_model_1 = require("../student/student.model");
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const user_utils_1 = require("./user.utils");
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createStudentIntoDB = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    //create a userObject
    const userData = {};
    //set student role
    userData.role = 'student';
    //if password is not given use default password
    userData.password = password || config_1.default.default_pass;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //find academic semester info
        const academicSemester = yield academicSemester_model_1.AcademicSemesterModel.findById(studentData.academicSemester);
        userData.id = yield (0, user_utils_1.generateStudentId)(academicSemester);
        //create user in DB (Transaction-1)
        const newUser = yield user_model_1.UserModel.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user.');
        }
        //set id, _id in studentData
        studentData.id = newUser[0].id;
        studentData.user = newUser[0]._id;
        //create a student (transaction-2)
        const newStudent = yield student_model_1.StudentModel.create([studentData], { session });
        if (!newStudent) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create student.');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
// This is example of Mongoose built in static method.
// if (await StudentModel.isStudentExists(studentData.id)) {
//     throw new Error("User already exists.")
// }
//This is example of Mongoose built in instance method.
// const studentInstance = new StudentModel(student)
// if(await studentInstance.isUserExists(student.id)){
//     throw new Error('User already exists!')
// }
// const result = await studentInstance.save();
exports.userService = {
    createStudentIntoDB
};
