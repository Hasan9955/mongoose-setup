import { TAcademicSemester, TMonth } from './academicSemester.interface';
import { Schema, model } from 'mongoose';


export const Month: TMonth[] = [
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
]
const AcademicSemesterSchema = new Schema<TAcademicSemester>({
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
        enum: Month
    },
    endMonth: {
        type: String,
        enum: Month
    }
},
    {
        timestamps: true
    })


AcademicSemesterSchema.pre('save', async function (next) {

    //is Semester Exists
    const isSemesterExists = await AcademicSemesterModel.findOne({
        year: this.year,
        name: this.name
    })
    if (isSemesterExists) {
        throw new Error('Semester is already exists.')
    }
    next();
})


AcademicSemesterSchema.pre('findOneAndUpdate', async function(next) {
    const docToUpdate = this.getUpdate()
  console.log(docToUpdate); 
  next();
})



export const AcademicSemesterModel = model<TAcademicSemester>('academicSemester', AcademicSemesterSchema)