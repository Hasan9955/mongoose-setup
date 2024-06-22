import { merge } from 'lodash';
import { AcademicFacultyModel } from './academicFaculty.model';
import { TAcademicFaculty } from './academicFaculty.interface';

const createAcademicFaculty = async(payload: TAcademicFaculty) =>{
    const result = await AcademicFacultyModel.create(payload);
    return result;
}


const getAllAcademicFaculties = async () =>{
    const result = await AcademicFacultyModel.find();
    return result;
}

const getSingleAcademicFaculty = async (id: string) =>{
    const result = await AcademicFacultyModel.findById(id);
    return result;
}

const updateAcademicFaculty = async (id: string, payload: TAcademicFaculty) =>{
    const facultyData = await AcademicFacultyModel.findById({id});

    if(!facultyData){
        throw new Error ('Faculty Data is not found.')
    }

    const mergedData = merge(facultyData, payload)

    const result = await AcademicFacultyModel.findByIdAndUpdate({id}, mergedData, {
        runValidators: true,
        new: true
    });
    return result;
}


export const AcademicFacultyServices = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}