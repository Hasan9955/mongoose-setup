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
exports.StudentServices = void 0;
const user_model_1 = require("./../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
// import deepMerge from '../../utility/deepMerge';
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const student_model_1 = require("./student.model");
const lodash_1 = require("lodash");
const getAllStudent = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.StudentModel.find()
        .populate('user')
        .populate('academicSemester')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    });
    return result;
});
const findAStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await StudentModel.findOne({ id: reqId })
    //get result by using aggritation.
    const result = yield student_model_1.StudentModel.findOne({ _id: id })
        .populate('user')
        .populate('academicSemester')
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    });
    return result;
});
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedStudent = yield student_model_1.StudentModel.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedStudent) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete student.');
        }
        const deleteUser = yield user_model_1.UserModel.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deleteUser) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete user.');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return { deleteStudent, deleteUser };
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(400, 'Failed to delete student.');
    }
});
const updateStudent = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.StudentModel.findOne({ id });
    if (!student) {
        throw new AppError_1.default(404, 'Student is not exists!');
    }
    //Method: 1
    //update student by lodash
    const mergeUpdate = (0, lodash_1.merge)(student, data);
    const result = yield student_model_1.StudentModel.findOneAndUpdate({ id: id }, mergeUpdate, {
        new: true,
        runValidators: true
    });
    //Method: 2
    //update student by our utility deepMerge function
    // const mergeUpdate = deepMerge(student, data)
    // console.log(mergeUpdate);
    // const result = await StudentModel.findOneAndUpdate({ id: id }, mergeUpdate, {
    //     new: true,
    //     runValidators: true
    // }) 
    //Method: 3
    //update by updateOne
    // const result = await StudentModel.updateOne({ id: id }, {
    //     $set: {
    //         name: {
    //             firstName: data.name.firstName ? data.name.firstName : "",
    //             middleName: data.name.middleName,
    //             lastName: data.name.lastName
    //         },
    //         password: data.password,
    //         gender: data.gender,
    //         contactNumber: data.contactNumber,
    //         email: data.email,
    //         studentStatus: data.studentStatus
    //     }
    // })
    return result;
});
exports.StudentServices = {
    getAllStudent,
    findAStudent,
    deleteStudent,
    updateStudent
};
