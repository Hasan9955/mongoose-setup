"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const validator_1 = __importDefault(require("../../Middlewares/validator"));
const academicFaculty_validation_1 = __importDefault(require("./academicFaculty.validation"));
const authValidator_1 = __importDefault(require("../../Middlewares/authValidator"));
const user_constant_1 = require("../user/user.constant");
const route = express_1.default.Router();
route.get('/', (0, authValidator_1.default)('admin', 'faculty', 'student'), academicFaculty_controller_1.AcademicFacultyControllers.getAllAcademicFaculties);
route.post('/create-academic-faculty', (0, authValidator_1.default)(user_constant_1.USER_ROLE.admin), (0, validator_1.default)(academicFaculty_validation_1.default), academicFaculty_controller_1.AcademicFacultyControllers.createAcademicFaculty);
route.get('/:id', (0, authValidator_1.default)('admin', 'faculty', 'student'), academicFaculty_controller_1.AcademicFacultyControllers.getSingleAcademicFaculty);
route.put('/:id', (0, authValidator_1.default)(user_constant_1.USER_ROLE.admin), (0, validator_1.default)(academicFaculty_validation_1.default), academicFaculty_controller_1.AcademicFacultyControllers.updateAcademicFaculty);
exports.academicFacultyRoutes = route;
