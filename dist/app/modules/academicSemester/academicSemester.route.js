"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = require("express");
const academicSemester_controller_1 = require("./academicSemester.controller");
const validator_1 = __importDefault(require("../../Middlewares/validator"));
const academicSemester_validation_1 = __importDefault(require("./academicSemester.validation"));
const authValidator_1 = __importDefault(require("../../Middlewares/authValidator"));
const router = (0, express_1.Router)();
router.post('/create-academic-semester', (0, authValidator_1.default)('admin'), (0, validator_1.default)(academicSemester_validation_1.default), academicSemester_controller_1.AcademicSemesterControllers.createAcademicSemester);
router.get('/', (0, authValidator_1.default)('admin', 'student', 'faculty'), academicSemester_controller_1.AcademicSemesterControllers.getAllAcademicSemester);
router.get('/:id', (0, authValidator_1.default)('admin', 'student', 'faculty'), academicSemester_controller_1.AcademicSemesterControllers.getAnAcademicSemester);
router.put('/:id', (0, authValidator_1.default)('admin'), academicSemester_controller_1.AcademicSemesterControllers.updateAnAcademicSemester);
exports.AcademicSemesterRoutes = router;
