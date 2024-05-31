"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
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
    id: {
        type: String,
        required: true,
        unique: true
    },
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
    email: { type: String },
    dateOfBirth: { type: String },
    contactNumber: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
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
