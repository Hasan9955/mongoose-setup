"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseRoutes = void 0;
const express_1 = require("express");
const offeredCourse_controller_1 = require("./offeredCourse.controller");
const offeredCourse_validation_1 = require("./offeredCourse.validation");
const validator_1 = __importDefault(require("../../Middlewares/validator"));
const router = (0, express_1.Router)();
router.get('/', offeredCourse_controller_1.offeredCourseControllers.getOfferedCourses);
router.get('/:id', offeredCourse_controller_1.offeredCourseControllers.getSingleOfferedCourses);
router.post('/create-offered-course', (0, validator_1.default)(offeredCourse_validation_1.createOfferedCourseValidationSchema), offeredCourse_controller_1.offeredCourseControllers.createOfferedCourse);
router.patch('/:id', (0, validator_1.default)(offeredCourse_validation_1.updateOfferedCourseValidationSchema), offeredCourse_controller_1.offeredCourseControllers.UpdateOfferedCourse);
exports.OfferedCourseRoutes = router;
