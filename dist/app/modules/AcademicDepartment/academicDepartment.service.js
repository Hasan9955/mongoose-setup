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
exports.AcademicDepartmentServices = void 0;
const academicDepartment_model_1 = require("./academicDepartment.model");
const lodash_1 = require("lodash");
const createAcademicDepartment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartmentModel.create(payload);
    return result;
});
const getAcademicDepartments = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartmentModel.find().populate('academicFaculty');
    return result;
});
const getSingleAcademicDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_model_1.AcademicDepartmentModel.findOne({ _id: id }).populate('academicFaculty');
    return result;
});
const updateAcademicDepartment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartmentData = yield academicDepartment_model_1.AcademicDepartmentModel.findById(id);
    if (!academicDepartmentData) {
    }
    const mergedData = (0, lodash_1.merge)(academicDepartmentData, payload);
    const result = yield academicDepartment_model_1.AcademicDepartmentModel.findOneAndUpdate({ _id: id }, mergedData, {
        runValidators: true,
        new: true
    });
    return result;
});
exports.AcademicDepartmentServices = {
    createAcademicDepartment,
    getAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment
};
