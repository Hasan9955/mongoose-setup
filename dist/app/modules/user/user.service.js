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
const createStudentIntoDB = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    //create a userObject
    const userData = {};
    //if password is not given use default password
    userData.password = password || config_1.default.default_pass;
    //Generate id
    userData.id = '203010' + Math.floor(Math.random() * 1000);
    //set role
    userData.role = 'student';
    //create user in DB
    const newUser = yield user_model_1.UserModel.create(userData);
    if (Object.keys(newUser).length) {
        //set id, _id in studentData
        studentData.id = newUser.id;
        studentData.user = newUser._id;
        //create student
        const newStudent = yield student_model_1.StudentModel.create(studentData);
        return newStudent;
    }
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
});
exports.userService = {
    createStudentIntoDB
};
