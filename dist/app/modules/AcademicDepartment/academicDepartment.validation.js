"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const AcademicDepartmentValidation = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: 'Academic Department name must be string.',
        required_error: 'Academic Department name is required.',
    }),
    academicFaculty: zod_1.z.string({
        invalid_type_error: 'Academic Faculty must be string.',
        required_error: 'Academic Faculty is required.',
    })
});
exports.default = AcademicDepartmentValidation;
