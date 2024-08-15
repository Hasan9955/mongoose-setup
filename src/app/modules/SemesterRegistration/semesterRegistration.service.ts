import QueryBuilder from "../../builder/QueryBuilder";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { semesterRegistrationSearchableFields } from "./semesterRegistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";


const createSemesterRegistration = async (payload: TSemesterRegistration) => {

    const academicSemester = payload?.academicSemester;

    //check is academic semester exists
    const isAcademicSemesterExists = await AcademicSemesterModel.findById(academicSemester)

    if (!isAcademicSemesterExists) {
        throw new Error('This academic semester is not exists.')
    }

    //check is semester already registered
    const isSemesterAlreadyRegistered = await SemesterRegistration.findOne({
        academicSemester
    })

    if (isSemesterAlreadyRegistered) {
        throw new Error('This semester is already registered')
    }

    const result = await SemesterRegistration.create(payload);
    return result


}


const getAllSemesterRegistrations = async (query: Record<string, unknown>) => {


    const getSemesterRegistrations = new QueryBuilder(SemesterRegistration.find()
        .populate('academicSemester'),
        query)
        .search(semesterRegistrationSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

        const result = await getSemesterRegistrations.modelQuery;
        return result;


}


const getSingleSemesterRegistration = async (id: string) =>{
    const result = await SemesterRegistration.findById(id)
    return result;
}



export const semesterRegistrationServices = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration
}