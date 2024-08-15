import { merge } from "lodash";
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchAbleFields } from "./course.constant";
import { TCourseFaculty, TCourse } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import mongoose from "mongoose";
import AppError from "../../Errors/AppError";
import httpStatus from "http-status";

const createCourse = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result
}


const getAllCourses = async (query: Record<string, unknown>) => {
    const getCourses = new QueryBuilder(Course.find()
        .populate('preRequisiteCourses.course')
        , query)
        .search(CourseSearchAbleFields)
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = await getCourses.modelQuery;
    return result
}

const getSingleCourse = async (id: string) => {
    const result = await Course.findById(id)
        .populate('preRequisiteCourses.course');
    return result
}


const updateCourse = async (id: string, payload: Partial<TCourse>) => {

    const session = await mongoose.startSession()

    try {
        session.startTransaction();


        const courseData = await Course.findById(id)
        if (!courseData) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Id given.')
        }
        const mergeData = merge(courseData, payload)
        const mapData = mergeData.preRequisiteCourses.filter(el => el.course && !el.isDeleted)
        mergeData.preRequisiteCourses = mapData
        const result = await Course.findByIdAndUpdate(
            id,
            mergeData,
            {
                new: true,
                validator: true,
                session
            }
        );
        if (!result) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course.')
        }

        await session.commitTransaction();
        await session.endSession();

        return result

    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error)
    }
}


const deleteCourse = async (id: string) => {
    const result = await Course.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true
        }
    );
    return result;
}




//part 2 Course Faculties model operations

const getCourseFaculties = async () => {
    const result = await CourseFaculty.find({});
    return result;
}


const assignFaculties = async (id: string, payload: TCourseFaculty) => {


    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet: { faculties: { $each: payload } }
        },
        {
            upsert: true,
            new: true
        }
    )

    return result;
}


const deleteFaculties = async (id: string, payload: TCourseFaculty) => {


    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            $pull: { faculties: { $in: payload } }
        },
        {
            new: true
        }
    )

    return result;
}



export const CourseServices = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,

    getCourseFaculties,
    assignFaculties,
    deleteFaculties
}