import AppError from '../../Errors/AppError';
import { TAcademicDepartment } from './academicDepartment.interface';
import { Schema, model } from 'mongoose';
const AcademicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicFaculty'
    },
},
    {
        timestamps: true,
    });






AcademicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExists = await AcademicDepartmentModel.findOne({ name: this.name });
    if (isDepartmentExists) {
        throw new AppError(404, 'This Department is already exists.')
    }
    next()
})


// AcademicDepartmentSchema.pre('findOneAndUpdate', async function(next) {
//     const query = this.getQuery();
//     const isDepartmentExists = await AcademicDepartmentModel.findOne(query);
//     if(!isDepartmentExists){
//         throw new Error('This Department does not exists.')
//     }

//     next()
// })



export const AcademicDepartmentModel = model<TAcademicDepartment>('AcademicDepartment', AcademicDepartmentSchema);


