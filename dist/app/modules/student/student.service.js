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
exports.StudentServices = void 0;
const student_model_1 = require("./student.model");
const createStudentIntoDB = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    // This is example of Mongoose built in static method.
    if (yield student_model_1.StudentModel.isStudentExists(studentData.id)) {
        throw new Error("User already exists.");
    }
    const result = yield student_model_1.StudentModel.create(studentData);
    //This is example of Mongoose built in instance method.
    // const studentInstance = new StudentModel(student)
    // if(await studentInstance.isUserExists(student.id)){
    //     throw new Error('User already exists!')
    // }
    // const result = await studentInstance.save();
    return result;
});
const getAllStudent = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.StudentModel.find();
    console.log(result);
    return result;
});
const findAStudent = (reqId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.StudentModel.findOne({ id: reqId });
    return result;
});
const deleteStudent = (reqId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.StudentModel.updateOne({ id: reqId }, {
        isDeleted: true
    });
    return result;
});
exports.StudentServices = {
    createStudentIntoDB,
    getAllStudent,
    findAStudent,
    deleteStudent
};
