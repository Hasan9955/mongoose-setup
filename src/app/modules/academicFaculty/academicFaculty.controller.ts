import catchAsync from "../../utility/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.service";


const createAcademicFaculty = catchAsync(async(req, res) =>{
    const result = await AcademicFacultyServices.createAcademicFaculty(req.body);
    res.status(200).json({
        success: true,
        message: 'Academic Faculty created Successfully.',
        data: result
    })
})


const getAllAcademicFaculties = catchAsync(async(req, res) =>{
    const result = await AcademicFacultyServices.getAllAcademicFaculties();
    res.status(200).json({
        success: true,
        message: 'Academic Faculties retrieved Successfully.',
        data: result
    })
})

const getSingleAcademicFaculty = catchAsync(async(req, res) =>{
    const id = req.params.id;
    const result = await AcademicFacultyServices.getSingleAcademicFaculty(id);
    res.status(200).json({
        success: true,
        message: 'Academic Faculty retrieved Successfully.',
        data: result
    })
});

const updateAcademicFaculty = catchAsync(async(req, res) =>{
    const id = req.params.id;
    const data = req.body;
    const result = await AcademicFacultyServices.updateAcademicFaculty(id, data);
    res.status(200).json({
        success: true,
        message: 'Academic Faculty updated Successfully.',
        data: result
    })
})


export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}

