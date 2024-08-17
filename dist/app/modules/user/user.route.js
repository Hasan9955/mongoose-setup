"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const student_zod_validation_1 = __importDefault(require("../student/student.zod.validation"));
const validator_1 = __importDefault(require("../../Middlewares/validator"));
const faculty_validation_1 = require("../Faculty/faculty.validation");
const admin_validation_1 = require("../Admin/admin.validation");
const authValidator_1 = __importDefault(require("../../Middlewares/authValidator"));
const user_constant_1 = require("./user.constant");
const router = express_1.default.Router();
router.post('/create-student', (0, authValidator_1.default)(user_constant_1.USER_ROLE.admin), (0, validator_1.default)(student_zod_validation_1.default), user_controller_1.userController.createStudent);
router.post('/create-faculty', (0, authValidator_1.default)(user_constant_1.USER_ROLE.admin), (0, validator_1.default)(faculty_validation_1.createFacultyValidationSchema), user_controller_1.userController.createFaculty);
router.post('/create-admin', (0, authValidator_1.default)(user_constant_1.USER_ROLE.admin), (0, validator_1.default)(admin_validation_1.createAdminValidationSchema), user_controller_1.userController.createAdmin);
exports.userRoutes = router;
