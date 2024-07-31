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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentModel = void 0;
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const mongoose_1 = require("mongoose");
const AcademicDepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicFaculty'
    },
}, {
    timestamps: true,
});
AcademicDepartmentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isDepartmentExists = yield exports.AcademicDepartmentModel.findOne({ name: this.name });
        if (isDepartmentExists) {
            throw new AppError_1.default(404, 'This Department is already exists.');
        }
        next();
    });
});
// AcademicDepartmentSchema.pre('findOneAndUpdate', async function(next) {
//     const query = this.getQuery();
//     const isDepartmentExists = await AcademicDepartmentModel.findOne(query);
//     if(!isDepartmentExists){
//         throw new Error('This Department does not exists.')
//     }
//     next()
// })
exports.AcademicDepartmentModel = (0, mongoose_1.model)('AcademicDepartment', AcademicDepartmentSchema);
