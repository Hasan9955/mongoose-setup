"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const validator_1 = __importDefault(require("../../Middlewares/validator"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const express_1 = __importDefault(require("express"));
const academicDepartment_validation_1 = __importDefault(require("./academicDepartment.validation"));
const authValidator_1 = __importDefault(require("../../Middlewares/authValidator"));
const user_constant_1 = require("../user/user.constant");
const route = express_1.default.Router();
route.get('/', (0, authValidator_1.default)('admin', 'faculty', 'student'), academicDepartment_controller_1.AcademicDepartControllers.getAcademicDepartments);
route.get('/:id', (0, authValidator_1.default)('admin', 'faculty', 'student'), academicDepartment_controller_1.AcademicDepartControllers.getSingleAcademicDepartment);
route.post('/create-academic-department', (0, authValidator_1.default)(user_constant_1.USER_ROLE.admin), (0, validator_1.default)(academicDepartment_validation_1.default), academicDepartment_controller_1.AcademicDepartControllers.createAcademicDepartment);
route.put('/:id', (0, authValidator_1.default)(user_constant_1.USER_ROLE.admin), academicDepartment_controller_1.AcademicDepartControllers.updateAcademicDepartment);
exports.AcademicDepartmentRoutes = route;
