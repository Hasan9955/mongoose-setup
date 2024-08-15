import catchAsync from "../../utility/catchAsync";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourse(req.body);
    res.status(200).json({
        success: true,
        message: 'Course created Successfully.',
        data: result
    })
})


const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCourses(req.query);
    res.status(200).json({
        success: true,
        message: 'Courses retrieved Successfully.',
        data: result
    })
})

const getSingleCourse = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await CourseServices.getSingleCourse(id);
    res.status(200).json({
        success: true,
        message: 'Course retrieved Successfully.',
        data: result
    })
});

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourse(id);

    res.status(200).json({
        success: true,
        message: 'Course is deleted.',
        data: result
    })
})

const updateCourse = catchAsync(async (req, res) => {
    const id = req.params.id;
    const payload = req.body;

    const result = await CourseServices.updateCourse(id, payload);
    res.status(200).json({
        success: true,
        message: 'Course is updated Successfully.',
        data: result
    })
})




//part 2 course faculties operations

const getCourseFaculties = catchAsync(async (req, res) => {
    const result = await CourseServices.getCourseFaculties();
    res.status(200).json({
        success: true,
        message: 'Course faculties retrieved successfully.',
        data: result
    })
})

const assignFacultiesIntoCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.assignFaculties(courseId, faculties);
    res.status(200).json({
        success: true,
        message: 'Faculties assigned successfully.',
        data: result
    })
})

const deleteFacultiesFromCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.deleteFaculties(courseId, faculties);
    res.status(200).json({
        success: true,
        message: 'Delete faculties from course successfully.',
        data: result
    })
})



export const CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,


    getCourseFaculties,
    assignFacultiesIntoCourse,
    deleteFacultiesFromCourse
}

