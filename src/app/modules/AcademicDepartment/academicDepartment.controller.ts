import catchAsync from "../../utility/catchAsync";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async(req, res) =>{
    const result = await AcademicDepartmentServices.createAcademicDepartment(req.body);
    res.status(200).json({
        success: true,
        message: 'Academic Department created Successfully.',
        data: result
    })


})


const getAcademicDepartments = catchAsync(async(req, res) =>{
    const result = await AcademicDepartmentServices.getAcademicDepartments();
    res.status(200).json({
        success: true,
        message: 'Academic Departments retrieved Successfully.',
        data: result
    })
})

const getSingleAcademicDepartment = catchAsync(async(req, res) =>{
    const result = await AcademicDepartmentServices.getSingleAcademicDepartment(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Academic Department retrieved Successfully.',
        data: result
    })
})


const updateAcademicDepartment = catchAsync(async(req, res) =>{
    const id = req.params.id;
    const data = req.body;

    const result = await AcademicDepartmentServices.updateAcademicDepartment(id, data);
    res.status(200).json({
        success: true,
        message: 'Academic Department updated Successfully.',
        data: result
    })
})


export const AcademicDepartControllers = {
    createAcademicDepartment, 
    getAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}