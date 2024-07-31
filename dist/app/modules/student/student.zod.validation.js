"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// UserName Schema
const userNameValidationZodSchema = zod_1.z.object({
    firstName: zod_1.z.string()
        .trim()
        .min(1, 'First name is required')
        .refine((value) => {
        const firstCarCapital = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return value === firstCarCapital;
    }, {
        message: '{VALUE} is not capitalize!',
    }),
    middleName: zod_1.z.string(),
    lastName: zod_1.z.string()
        .min(1, 'Last name is required')
        .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message: '{VALUE} is not valid value.',
    }),
});
// Guardian Schema
const guardianValidationZodSchema = zod_1.z.object({
    fatherName: zod_1.z.string(),
    fatherOccupation: zod_1.z.string(),
    fatherContactNo: zod_1.z.string(),
    motherName: zod_1.z.string(),
    motherOccupation: zod_1.z.string(),
    motherContactNo: zod_1.z.string(),
});
// LocalGuardian Schema
const localGuardianValidationZodSchema = zod_1.z.object({
    name: zod_1.z.string(),
    occupation: zod_1.z.string(),
    contactNo: zod_1.z.string(),
    address: zod_1.z.string(),
});
// Student Schema
const studentValidationZodSchema = zod_1.z.object({
    password: zod_1.z.string().min(6, 'password should be at last 6 character').optional(),
    student: zod_1.z.object({
        name: userNameValidationZodSchema,
        gender: zod_1.z.enum(['male', 'female', 'other'], {
            errorMap: (issue, _ctx) => {
                if (issue.code === 'invalid_enum_value') {
                    return { message: "{VALUE} is not supported. The gender field can be one of the following: 'male', 'female' or 'other'" };
                }
                return { message: 'Gender is required' };
            },
        }),
        email: zod_1.z.string().email('{VALUE} is not valid email'),
        dateOfBirth: zod_1.z.string(),
        contactNumber: zod_1.z.string()
            .min(11, 'The length of ContactNO should be 11')
            .max(11, 'The length of ContactNO should be 11')
            .refine((value) => /^[0-9]+$/.test(value), 'ContactNO should only contain numbers'),
        emergencyContactNo: zod_1.z.string()
            .min(11, 'The length of ContactNO should be 11')
            .max(11, 'The length of ContactNO should be 11')
            .refine((value) => /^[0-9]+$/.test(value), 'ContactNO should only contain numbers'),
        bloodGroup: zod_1.z.string(),
        presentAddress: zod_1.z.string(),
        permanentAddress: zod_1.z.string(),
        guardian: guardianValidationZodSchema,
        localGuardian: localGuardianValidationZodSchema,
        studentStatus: zod_1.z.enum(['active', 'blocked']).default('active'),
        profilePic: zod_1.z.string(),
        academicSemester: zod_1.z.string(),
        academicDepartment: zod_1.z.string(),
        isDeleted: zod_1.z.boolean().default(false)
    })
});
// type Student = z.infer<typeof studentValidationZodSchema>
exports.default = studentValidationZodSchema;
