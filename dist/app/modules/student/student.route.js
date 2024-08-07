"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const student_controller_1 = require("./student.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// will call controller func
router.get('/', student_controller_1.StudentController.getAllStudents);
router.patch('/update/:id', student_controller_1.StudentController.updateAStudent);
router.get('/:studentId', student_controller_1.StudentController.findAStudent);
router.delete('/delete/:studentId', student_controller_1.StudentController.deleteAStudent);
exports.StudentRoutes = router;
