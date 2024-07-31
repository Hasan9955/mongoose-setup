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
const route = express_1.default.Router();
route.get('/', academicFaculty_controller_1.AcademicFacultyControllers.getAllAcademicFaculties);
route.post('/create-academic-faculty', (0, validator_1.default)(academicFaculty_validation_1.default), academicFaculty_controller_1.AcademicFacultyControllers.createAcademicFaculty);
route.get('/:id', academicFaculty_controller_1.AcademicFacultyControllers.getSingleAcademicFaculty);
route.put('/:id', (0, validator_1.default)(academicFaculty_validation_1.default), academicFaculty_controller_1.AcademicFacultyControllers.updateAcademicFaculty);
exports.academicFacultyRoutes = route;
