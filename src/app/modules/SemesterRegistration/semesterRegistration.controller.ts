import catchAsync from "../../utility/catchAsync";
import { semesterRegistrationServices } from "./semesterRegistration.service";


const createSemesterRegistration = catchAsync(async (req, res) => {
    const result = await semesterRegistrationServices.createSemesterRegistration(req.body)

    res.status(200).json({
        success: true,
        message: 'Semester is registered successfully',
        data: result

    })
})


const getAllSemesterRegistrations = catchAsync(async (req, res) =>{
    const result = await semesterRegistrationServices.getAllSemesterRegistrations(req.query)
    res.status(200).json({
        success: true,
        message: 'Semester is retrieved successfully',
        data: result

    })

})

const getSingleSemesterRegistration = catchAsync(async (req, res) =>{
    const result = await semesterRegistrationServices.getSingleSemesterRegistration(req.params.id)
    res.status(200).json({
        success: true,
        message: 'Semester is retrieved successfully',
        data: result

    })
})



export const semesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration
}