"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterModel = exports.Month = void 0;
const mongoose_1 = require("mongoose");
exports.Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const AcademicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: ['Autumn', 'Summer', 'Fall']
    },
    code: {
        type: String,
        enum: ['01', '02', '03']
    },
    year: {
        type: String,
        required: true
    },
    startMonth: {
        type: String,
        enum: exports.Month
    },
    endMonth: {
        type: String,
        enum: exports.Month
    }
}, {
    timestamps: true
});
AcademicSemesterSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //is Semester Exists
        const isSemesterExists = yield exports.AcademicSemesterModel.findOne({
            year: this.year,
            name: this.name
        });
        if (isSemesterExists) {
            throw new Error('Semester is already exists.');
        }
        next();
    });
});
AcademicSemesterSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const docToUpdate = this.getUpdate();
        console.log(docToUpdate);
        next();
    });
});
exports.AcademicSemesterModel = (0, mongoose_1.model)('AcademicSemester', AcademicSemesterSchema);
