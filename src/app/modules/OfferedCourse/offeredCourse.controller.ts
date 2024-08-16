import catchAsync from "../../utility/catchAsync"
import { offeredCourseServices } from "./offeredCourse.service"

const createOfferedCourse = catchAsync(async (req, res) => {
    const result = await offeredCourseServices.createOfferedCourse(req.body.body)
    
    res.status(200).json({
        success: true,
        message: 'Offered course created successfully!',
        data: result
    })
})

const getOfferedCourses = catchAsync(async (req, res) => {
    const result = await offeredCourseServices.getOfferedCourses(req.query)
    
    res.status(200).json({
        success: true,
        message: 'Offered courses retrieved successfully!',
        data: result
    })
})

const getSingleOfferedCourses = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await offeredCourseServices.getSingleOfferedCourses(id)
    
    res.status(200).json({
        success: true,
        message: 'Offered course retrieved successfully!',
        data: result
    })
})

const UpdateOfferedCourse = catchAsync(async (req, res) => {
    const {id} = req.params;
    const data = req.body.body;
    const result = await offeredCourseServices.UpdateOfferedCourses(id, data)
    
    res.status(200).json({
        success: true,
        message: 'Offered course updated successfully!',
        data: result
    })
})

export const offeredCourseControllers = {
    createOfferedCourse,
    getOfferedCourses,
    getSingleOfferedCourses,
    UpdateOfferedCourse
}