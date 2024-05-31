"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        // trim property will remove the string spaces
        trim: true,
        required: [true, 'First name is required'],
        validate: {
            validator: function (value) {
                const firstCarCapital = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                return value === firstCarCapital;
            },
            message: '{VALUE} is not capitalize!'
        }
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        validate: {
            validator: (value) => validator_1.default.isAlpha(value),
            message: "{VALUE} is not valid value."
        }
    }
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: String,
    fatherOccupation: String,
    fatherContactNo: String,
    motherName: String,
    motherOccupation: String,
    motherContactNo: String,
});
const localGuardianSchema = new mongoose_1.Schema({
    name: String,
    occupation: String,
    contactNo: String,
    address: String,
});
const StudentSchema = new mongoose_1.Schema({
    id: { type: String, unique: true, required: true },
    name: {
        type: userNameSchema,
        required: true
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: "{VALUE} is not supported. The gender filed can be one of the following: 'male', 'female' or 'other'",
        },
        required: [true, 'Gender is required']
    },
    email: {
        type: String,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: "{VALUE} is not valid email."
        }
    },
    dateOfBirth: { type: String },
    contactNumber: {
        type: String,
        minlength: [11, 'The length of ContactNO should be 11'],
        maxlength: [11, 'The length of ContactNO should be 11'],
        required: [true, 'ContactNO is required!']
    },
    emergencyContactNo: {
        type: String,
        minlength: [11, 'The length of ContactNO should be 11'],
        maxlength: [11, 'The length of ContactNO should be 11'],
        required: [true, 'ContactNO is required!']
    },
    bloodGroup: { type: String },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    guardian: {
        type: guardianSchema,
        required: true
    },
    localGuardian: {
        type: localGuardianSchema,
        required: true
    },
    studentStatus: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
    profilePic: String
});
exports.StudentModel = (0, mongoose_1.model)('Student', StudentSchema);
