import { z } from "zod";


const AcademicFacultyValidationSchema = z.object({
    name: z.string({
        invalid_type_error: 'Academic Faculty must be string.'
    })
})


export default AcademicFacultyValidationSchema;