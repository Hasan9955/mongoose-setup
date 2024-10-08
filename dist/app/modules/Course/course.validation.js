"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidations = void 0;
const zod_1 = require("zod");
const PreRequisiteCourseValidationSchema = zod_1.z.object({
    course: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().optional()
});
const createCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        prefix: zod_1.z.string(),
        code: zod_1.z.number(),
        credits: zod_1.z.number(),
        isDeleted: zod_1.z.boolean().optional(),
        preRequisiteCourses: zod_1.z.array(PreRequisiteCourseValidationSchema).optional()
    })
});
const updateCourseValidationSchema = createCourseValidationSchema.partial();
const CourseFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        faculties: zod_1.z.array(zod_1.z.string())
    })
});
exports.CourseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
    CourseFacultyValidationSchema
};
