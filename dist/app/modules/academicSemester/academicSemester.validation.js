"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const academicSemester_model_1 = require("./academicSemester.model");
const academicSemesterZodSchema = zod_1.z.object({
    name: zod_1.z.enum(['Autumn', 'Summer', 'Fall']),
    code: zod_1.z.enum(['01', '02', '03']),
    year: zod_1.z.string(),
    startMonth: zod_1.z.enum([...academicSemester_model_1.Month]),
    endMonth: zod_1.z.enum([...academicSemester_model_1.Month])
});
exports.default = academicSemesterZodSchema;
