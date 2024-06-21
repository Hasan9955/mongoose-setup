import { AcademicSemesterServices } from './academicSemester.service';
import { RequestHandler } from 'express';
import catchAsync from "../../utility/catchAsync";

const createAcademicSemester: RequestHandler = catchAsync(async(req, res) =>{

    const result = await AcademicSemesterServices.createAcademicSemester(req.body)

    res.status(200).json({
        success: true,
        message: 'Academic Semester created successfully.',
        data: result
    })

})

const getAllAcademicSemester: RequestHandler = catchAsync(async(req, res) =>{
    const result = await AcademicSemesterServices.getAllAcademicSemester();

    res.status(200).json({
        success: true,
        message: 'All Academic Semesters retrieved successfully.',
        data: result
    })
})


const getAnAcademicSemester = catchAsync(async(req, res) =>{
    const id = req.params.id
    const result = await AcademicSemesterServices.getAnAcademicSemester(id)
    
    res.status(200).json({
        success: true,
        message: 'Academic Semester retrieved successfully.',
        data: result
    })
})

const updateAnAcademicSemester = catchAsync(async(req, res) =>{
    const id = req.params.id;
    const data = req.body;
    const result = await AcademicSemesterServices.updateAnAcademicSemester(id, data);
    res.status(200).json({
        success: true,
        message: 'Academic Semester updated successfully.',
        data: result
    })
})


export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemester,
    getAnAcademicSemester,
    updateAnAcademicSemester
}