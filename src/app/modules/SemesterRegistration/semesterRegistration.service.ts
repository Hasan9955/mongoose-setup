import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../Errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { registrationStatus, semesterRegistrationSearchableFields } from "./semesterRegistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import { OfferedCourse } from "../OfferedCourse/offeredCourse.model";


const createSemesterRegistration = async (payload: TSemesterRegistration) => {


    const academicSemester = payload?.academicSemester;

    //check if there any registered semester that is  already upcoming or ongoing;
    const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
        $or: [{ status: registrationStatus.UPCOMING }, { status: registrationStatus.ONGOING }]
    })

    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError(httpStatus.BAD_REQUEST,
            `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester!`)
    }


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


const getSingleSemesterRegistration = async (id: string) => {
    const result = await SemesterRegistration.findById(id)
    return result;
}

const updateSemesterRegistration = async (id: string, payload: TSemesterRegistration) => {


    const requestedSemesterRegistration = await SemesterRegistration.findById(id)

    //check is semester is exists
    if (!requestedSemesterRegistration) {
        throw new AppError(httpStatus.NOT_FOUND, 'Requested semester is not found.')
    }

    const currentSemesterStatus = requestedSemesterRegistration?.status;
    const requestedSemesterStatus = payload?.status;
    //if the requested semester is ended we will not update anything
    if (currentSemesterStatus === registrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST, `This semester registration is already ${currentSemesterStatus}`)
    }

    //  UPCOMING --> ONGOING --> ENDED
    if (currentSemesterStatus === registrationStatus.UPCOMING && requestedSemesterStatus === registrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST, `Your can not directly change status from ${currentSemesterStatus} to ${requestedSemesterStatus}`)
    }

    if (currentSemesterStatus === registrationStatus.ONGOING && requestedSemesterStatus === registrationStatus.UPCOMING) {
        throw new AppError(httpStatus.BAD_REQUEST, `Your can not directly change status from ${currentSemesterStatus} to ${requestedSemesterStatus}`)
    }

    const result = await SemesterRegistration.findByIdAndUpdate(id,
        payload,
        {
            new: true,
            runValidators: true
        }
    )

    return result;

}


const deleteSemesterRegistration = async (id: string) => {
    const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
    if (!isSemesterRegistrationExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Requested semester registration is not found.')
    }

    // Delete all offered courses under this registered semester
    const deleteOfferedCoursesUnderThisSemester = await OfferedCourse.deleteMany({
        semesterRegistration: id
    }) 

    // now delete the registered semester
    const result = await SemesterRegistration.findByIdAndDelete(id)
    return result;

}



export const semesterRegistrationServices = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
    deleteSemesterRegistration
}