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
exports.semesterRegistrationControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const semesterRegistration_service_1 = require("./semesterRegistration.service");
const createSemesterRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_service_1.semesterRegistrationServices.createSemesterRegistration(req.body);
    res.status(200).json({
        success: true,
        message: 'Semester is registered successfully',
        data: result
    });
}));
const getAllSemesterRegistrations = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_service_1.semesterRegistrationServices.getAllSemesterRegistrations(req.query);
    res.status(200).json({
        success: true,
        message: 'Semester is retrieved successfully',
        data: result
    });
}));
const getSingleSemesterRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semesterRegistration_service_1.semesterRegistrationServices.getSingleSemesterRegistration(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Semester is retrieved successfully',
        data: result
    });
}));
const updateSemesterRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield semesterRegistration_service_1.semesterRegistrationServices.updateSemesterRegistration(id, data);
    res.status(200).json({
        success: true,
        message: 'Semester registration is updated successfully',
        data: result
    });
}));
exports.semesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    updateSemesterRegistration
};
