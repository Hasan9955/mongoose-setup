import { z } from "zod";


const AcademicFacultyValidation = z.object({
    name: z.string({
        invalid_type_error: 'Academic Faculty must be string.'
    })
})


export default AcademicFacultyValidation;