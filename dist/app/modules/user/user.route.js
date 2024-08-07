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
const router = express_1.default.Router();
router.post('/create-student', (0, validator_1.default)(student_zod_validation_1.default), user_controller_1.userController.createStudent);
exports.userRoutes = router;
