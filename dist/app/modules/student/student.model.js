"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true }
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
    id: { type: String },
    name: userNameSchema,
    gender: ['male', 'female'],
    email: { type: String },
    dateOfBirth: { type: String },
    contactNumber: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: { type: String },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    studentStatus: ['active', 'blocked'],
    profilePic: String
});
exports.StudentModel = (0, mongoose_1.model)('Student', StudentSchema);
