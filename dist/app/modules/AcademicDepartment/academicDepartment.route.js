"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
route.get('/', academicDepartment_controller_1.AcademicDepartControllers.getAcademicDepartments);
route.get('/:id', academicDepartment_controller_1.AcademicDepartControllers.getSingleAcademicDepartment);
route.post('/create-academic-department', 
// validationRequest(AcademicDepartmentValidation), 
academicDepartment_controller_1.AcademicDepartControllers.createAcademicDepartment);
route.put('/:id', academicDepartment_controller_1.AcademicDepartControllers.updateAcademicDepartment);
exports.AcademicDepartmentRoutes = route;
