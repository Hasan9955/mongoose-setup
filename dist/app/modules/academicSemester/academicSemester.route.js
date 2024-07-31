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
const router = (0, express_1.Router)();
router.post('/create-academic-semester', (0, validator_1.default)(academicSemester_validation_1.default), academicSemester_controller_1.AcademicSemesterControllers.createAcademicSemester);
router.get('/', academicSemester_controller_1.AcademicSemesterControllers.getAllAcademicSemester);
router.get('/:id', academicSemester_controller_1.AcademicSemesterControllers.getAnAcademicSemester);
router.put('/:id', academicSemester_controller_1.AcademicSemesterControllers.updateAnAcademicSemester);
exports.AcademicSemesterRoutes = router;
