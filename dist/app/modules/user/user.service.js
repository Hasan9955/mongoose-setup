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
const admin_model_1 = require("../Admin/admin.model");
const faculty_model_1 = require("../Faculty/faculty.model");
const academicDepartment_model_1 = require("../AcademicDepartment/academicDepartment.model");
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
        const newUser = yield user_model_1.User.create([userData], { session });
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
const createFacultyIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    //if password is not given , use deafult password
    userData.password = password || config_1.default.default_pass;
    //set student role
    userData.role = 'faculty';
    // find academic department info
    const academicDepartment = yield academicDepartment_model_1.AcademicDepartmentModel.findById(payload.academicDepartment);
    if (!academicDepartment) {
        throw new AppError_1.default(400, 'Academic department not found');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        userData.id = yield (0, user_utils_1.generateFacultyId)();
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session }); // array
        //create a faculty
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a faculty (transaction-2)
        const newFaculty = yield faculty_model_1.Faculty.create([payload], { session });
        if (!newFaculty.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create faculty');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newFaculty;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createAdminIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // create a user object
    const userData = {};
    //if password is not given , use deafult password
    userData.password = password || config_1.default.default_pass;
    //set student role
    userData.role = 'admin';
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        userData.id = yield (0, user_utils_1.generateAdminId)();
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session });
        //create a admin
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        // set id , _id as user 
        payload.id = (_a = newUser[0]) === null || _a === void 0 ? void 0 : _a.id;
        payload.user = (_b = newUser[0]) === null || _b === void 0 ? void 0 : _b._id; //reference _id 
        // create a admin (transaction-2)
        const newAdmin = yield admin_model_1.Admin.create([payload], { session });
        if (!newAdmin.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newAdmin;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
exports.userService = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB,
};
