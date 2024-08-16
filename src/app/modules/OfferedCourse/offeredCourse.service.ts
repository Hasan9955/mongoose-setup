import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { SemesterRegistration } from './../SemesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model"
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartmentModel } from '../AcademicDepartment/academicDepartment.model';
import { Faculty } from '../Faculty/faculty.model';
import { Course } from '../Course/course.model';
import { hasTimeConflict } from './offeredCourse.utils';
import QueryBuilder from '../../builder/QueryBuilder';
import { offeredCourseSearchableFields } from './offeredCourse.constant';


const createOfferedCourse = async (payload: TOfferedCourse) => {

    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty, section, days, startTime, endTime } = payload;

    //check is the semesterRegistration id is exists
    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration)
    if (!isSemesterRegistrationExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Semester registration id is  not exists')
    }

    const isAcademicFacultyExists = await AcademicFacultyModel.findById(academicFaculty)
    if (!isAcademicFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty is  not exists')
    }

    const currentAcademicDepartment = await AcademicDepartmentModel.findById(academicDepartment)
    if (!currentAcademicDepartment) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic Department is  not exists')
    }

    const isCourseExists = await Course.findById(course)
    if (!isCourseExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course is  not exists')
    }

    const isFacultyExists = await Faculty.findById(faculty)
    if (!isFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Faculty is  not exists')
    }

    //check if the department is belong to faculty 
    const isDepartmentBelongToFaculty = currentAcademicDepartment?.academicFaculty?.toString() === academicFaculty.toString();

    if (!isDepartmentBelongToFaculty) {
        throw new AppError(httpStatus.BAD_REQUEST, `This ${currentAcademicDepartment.name} is not belong to this ${isAcademicFacultyExists.name}`)
    }

    //check if the same offered course same section in same registered semester exists
    const isSameOfferedCourseExistsWithSameSectionWithSameRegisteredSemester = await OfferedCourse.findOne({
        semesterRegistration,
        course,
        section
    })
    if (isSameOfferedCourseExistsWithSameSectionWithSameRegisteredSemester) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Offered course with same section is already exists.')
    }

    //get the schedules of current faculty
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select('days startTime endTime')

    const newSchedule = {
        days,
        startTime,
        endTime
    }

    if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(httpStatus.CONFLICT, 'This faculty is not available at that time! Choose another time or day.')
    }

    const academicSemester = isSemesterRegistrationExists?.academicSemester;

    const result = await OfferedCourse.create({ ...payload, academicSemester })
    return result;
}

const getOfferedCourses = async (query: Record<string, unknown>) => {

    const getOfferedCourse = new QueryBuilder(OfferedCourse.find()
    .populate('semesterRegistration')
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('course')
    .populate('faculty'), 
    query)
    .search(offeredCourseSearchableFields)
    .sort()
    .paginate()
    .filter()
    .fields()

    const result = await getOfferedCourse.modelQuery;
    return result;
}

const getSingleOfferedCourses = async (id: string) => {
    const result = await OfferedCourse.findById(id)
    .populate('semesterRegistration')
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('course')
    .populate('faculty')
    return result;
}

const UpdateOfferedCourses = async (id: string, payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime' | 'section'>) => {

    const { faculty, startTime, endTime, days } = payload;
    const isOfferedCourseExists = await OfferedCourse.findById(id)
    if (!isOfferedCourseExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Offered Course is  not exists')
    }

    const isFacultyExists = await Faculty.findById(faculty) 
    if (!isFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Faculty is  not exists')
    }

    const semesterRegistrationId = isOfferedCourseExists.semesterRegistration;
    const semesterRegistrationStatus = await SemesterRegistration.findById(semesterRegistrationId)
    if (semesterRegistrationStatus?.status !== 'UPCOMING') {
        throw new AppError(httpStatus.BAD_REQUEST, `You can not update offered course as it is ${semesterRegistrationStatus?.status}`)
    }


    //get the schedules of current faculty
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration: semesterRegistrationId,
        faculty,
        days: { $in: days }
    }).select('days startTime endTime')

    const newSchedule = {
        days,
        startTime,
        endTime
    }

    if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(httpStatus.CONFLICT, 'This faculty is not available at that time! Choose another time or day.')
    }

    const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    })
    return result;
}


export const offeredCourseServices = {
    createOfferedCourse,
    getOfferedCourses,
    getSingleOfferedCourses,
    UpdateOfferedCourses
}