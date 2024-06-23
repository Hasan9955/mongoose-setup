import { merge } from 'lodash';
import catchAsync from '../../utility/catchAsync';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';


const createAcademicSemester = async(payload: TAcademicSemester) =>{

    const academicSemesterCodeMapper: {
        [key: string]: string
    } = {
        Autumn: '01',
        Summer: '02',
        Fall: '03'
    }

    if(academicSemesterCodeMapper[payload.name] !== payload.code){
        throw new AppError (httpStatus.BAD_REQUEST, 'Semester code invalid.')
    }

    const result = await AcademicSemesterModel.create(payload);
    return result;
}




const getAllAcademicSemester = async() =>{
    const result = await AcademicSemesterModel.find();
    return result;
}


const getAnAcademicSemester = async (id: string) =>{
    const result = await AcademicSemesterModel.findById(id)
    return result;
}


const updateAnAcademicSemester = async (id: string, data: TAcademicSemester) =>{
    const findSemester = await AcademicSemesterModel.findById(id)
    const mergeData = merge(findSemester, data)
    const result = await AcademicSemesterModel.findByIdAndUpdate(id, mergeData, {
        new: true,
        runValidators: true
    })
    return result;
}

export const AcademicSemesterServices = {
    createAcademicSemester,
    getAllAcademicSemester,
    getAnAcademicSemester,
    updateAnAcademicSemester
}