import { TAcademicFaculty } from './academicFaculty.interface';
import { Schema, model } from 'mongoose';



const AcademicFacultySchema = new Schema<TAcademicFaculty>({
    name: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true
})


export const AcademicFacultyModel = model<TAcademicFaculty>('AcademicFaculty', AcademicFacultySchema)