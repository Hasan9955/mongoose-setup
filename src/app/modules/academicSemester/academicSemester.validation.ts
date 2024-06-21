import { z } from "zod"; 
import { Month } from "./academicSemester.model"; 


const academicSemesterZodSchema = z.object({
    name: z.enum(['Autumn', 'Summer', 'Fall']),
    code: z.enum(['01', '02', '03']),
    year: z.string(),
    startMonth: z.enum([...Month] as [string, ...string[]]),
    endMonth: z.enum([...Month] as [string, ...string[]])

})

export default academicSemesterZodSchema;