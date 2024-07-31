"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const AcademicFacultyValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: 'Academic Faculty must be string.'
    })
});
exports.default = AcademicFacultyValidationSchema;
