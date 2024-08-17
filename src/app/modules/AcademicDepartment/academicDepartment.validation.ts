import { z } from "zod";

const AcademicDepartmentValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic Department name must be string.',
            required_error: 'Academic Department name is required.',
        }),
        academicFaculty: z.string({
            invalid_type_error: 'Academic Faculty must be string.',
            required_error: 'Academic Faculty is required.',
        })
    
    })
})

export default AcademicDepartmentValidation;