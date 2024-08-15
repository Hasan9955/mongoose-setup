
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define the userNameValidationJoiSchema
const userNameValidationJoiSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .trim()
        .required()
        .regex(/^[A-Z][a-z]*$/)
        .message('"firstName" must be capitalized'),
    middleName: joi_1.default.string().optional(),
    lastName: joi_1.default.string()
        .required()
        .pattern(/^[A-Za-z]+$/)
        .message('"lastName" is not valid')
});
// Define the guardianSchema
const guardianValidationJoiSchema = joi_1.default.object({
    fatherName: joi_1.default.string().optional(),
    fatherOccupation: joi_1.default.string().optional(),
    fatherContactNo: joi_1.default.string().optional(),
    motherName: joi_1.default.string().optional(),
    motherOccupation: joi_1.default.string().optional(),
    motherContactNo: joi_1.default.string().optional(),
});
// Define the localGuardianValidationJoiSchema
const localGuardianValidationJoiSchema = joi_1.default.object({
    name: joi_1.default.string().optional(),
    occupation: joi_1.default.string().optional(),
    contactNo: joi_1.default.string().optional(),
    address: joi_1.default.string().optional(),
});
// Define the studentSchema
const studentValidationJoiSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    name: userNameValidationJoiSchema.required(),
    gender: joi_1.default.string()
        .valid('male', 'female', 'other')
        .required()
        .messages({
        'any.only': '{#label} is not supported. The gender field can be one of the following: \'male\', \'female\' or \'other\'',
        'any.required': 'Gender is required'
    }),
    email: joi_1.default.string()
        .email()
        .messages({
        'string.email': '{#label} is not a valid email'
    }),
    dateOfBirth: joi_1.default.string().optional(),
    contactNumber: joi_1.default.string()
        .length(11)
        .required()
        .messages({
        'string.length': 'The length of ContactNO should be 11',
        'any.required': 'ContactNO is required!'
    }),
    emergencyContactNo: joi_1.default.string()
        .length(11)
        .required()
        .messages({
        'string.length': 'The length of ContactNO should be 11',
        'any.required': 'ContactNO is required!'
    }),
    bloodGroup: joi_1.default.string().optional(),
    presentAddress: joi_1.default.string().optional(),
    permanentAddress: joi_1.default.string().optional(),
    guardian: guardianValidationJoiSchema.required(),
    localGuardian: localGuardianValidationJoiSchema.required(),
    studentStatus: joi_1.default.string()
        .valid('active', 'blocked')
        .default('active'),
    profilePic: joi_1.default.string().optional()
});
exports.default = studentValidationJoiSchema;
