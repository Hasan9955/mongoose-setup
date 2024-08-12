import catchAsync from "../../utility/catchAsync";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async(req, res) =>{
    const result = await CourseServices.createCourse(req.body);
    res.status(200).json({
        success: true,
        message: 'Course created Successfully.',
        data: result
    })
})


const getAllCourses = catchAsync(async(req, res) =>{
    const result = await CourseServices.getAllCourses(req.query);
    res.status(200).json({
        success: true,
        message: 'Courses retrieved Successfully.',
        data: result
    })
})

const getSingleCourse = catchAsync(async(req, res) =>{
    const id = req.params.id;
    const result = await CourseServices.getSingleCourse(id);
    res.status(200).json({
        success: true,
        message: 'Course retrieved Successfully.',
        data: result
    })
});

const deleteCourse = catchAsync(async (req, res) =>{
    const {id} = req.params;
    const result = await CourseServices.deleteCourse(id);

    res.status(200).json({
        success: true,
        message: 'Course is deleted.',
        data: result
    })
})

const updateCourse = catchAsync(async(req, res) =>{
    const id = req.params.id;
    const payload = req.body;
    
    const result = await CourseServices.updateCourse(id, payload);
    res.status(200).json({
        success: true,
        message: 'Course is updated Successfully.',
        data: result
    })
})


export const CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse
}

