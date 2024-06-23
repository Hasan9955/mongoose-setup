import { AcademicDepartmentModel } from './academicDepartment.model';
import { TAcademicDepartment } from "./academicDepartment.interface"
import { merge } from 'lodash';
import AppError from '../../Errors/AppError';

const createAcademicDepartment = async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartmentModel.create(payload)
    return result;
};

const getAcademicDepartments = async () => {
    const result = await AcademicDepartmentModel.find().populate('academicFaculty');
    return result;
}

const getSingleAcademicDepartment = async (id: string) => {
    const result = await AcademicDepartmentModel.findOne({ _id: id }).populate('academicFaculty');
    return result;
}


const updateAcademicDepartment = async (id: string, payload: TAcademicDepartment) => {
    const academicDepartmentData = await AcademicDepartmentModel.findById(id);
    if (!academicDepartmentData) {
    }

    const mergedData = merge(academicDepartmentData, payload);

    const result = await AcademicDepartmentModel.findOneAndUpdate({ _id: id }, mergedData, {
        runValidators: true,
        new: true
    })

    return result;

}


export const AcademicDepartmentServices = {
    createAcademicDepartment,
    getAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}