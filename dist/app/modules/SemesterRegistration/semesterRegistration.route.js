"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationRoutes = void 0;
const express_1 = require("express");
const validator_1 = __importDefault(require("../../Middlewares/validator"));
const semesterRegistration_validation_1 = require("./semesterRegistration.validation");
const semesterRegistration_controller_1 = require("./semesterRegistration.controller");
const router = (0, express_1.Router)();
router.get('/', semesterRegistration_controller_1.semesterRegistrationControllers.getAllSemesterRegistrations);
router.get('/:id', semesterRegistration_controller_1.semesterRegistrationControllers.getSingleSemesterRegistration);
router.post('/create-semester-registration', (0, validator_1.default)(semesterRegistration_validation_1.createSemesterRegistrationValidationSchema), semesterRegistration_controller_1.semesterRegistrationControllers.createSemesterRegistration);
router.patch('/:id', (0, validator_1.default)(semesterRegistration_validation_1.updateSemesterRegistrationValidationSchema), semesterRegistration_controller_1.semesterRegistrationControllers.updateSemesterRegistration);
exports.semesterRegistrationRoutes = router;
