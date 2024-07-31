"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentModel = void 0;
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
// AcademicDepartmentSchema.pre('save', async function (next) {
//     const isDepartmentExists = await AcademicDepartmentModel.findOne({ name: this.name });
//     if (isDepartmentExists) {
//         throw new AppError(404, 'This Department is already exists.')
//     }
//     next()
// })
// AcademicDepartmentSchema.pre('findOneAndUpdate', async function(next) {
//     const query = this.getQuery();
//     const isDepartmentExists = await AcademicDepartmentModel.findOne(query);
//     if(!isDepartmentExists){
//         throw new Error('This Department does not exists.')
//     }
//     next()
// })
exports.AcademicDepartmentModel = (0, mongoose_1.model)('AcademicDepartment', AcademicDepartmentSchema);
