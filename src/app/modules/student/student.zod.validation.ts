import { z } from "zod";

// UserName Schema
const userNameValidationZodSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1, 'First name is required')
    .refine(
      (value) => {
        const firstCarCapital = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return value === firstCarCapital;
      },
      {
        message: '{VALUE} is not capitalize!',
      }
    ),
  middleName: z.string(),
  lastName: z.string()
    .min(1, 'Last name is required')
    .refine(
      (value) => /^[a-zA-Z]+$/.test(value),
      {
        message: '{VALUE} is not valid value.',
      }
    ),
});

// Guardian Schema
const guardianValidationZodSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// LocalGuardian Schema
const localGuardianValidationZodSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Student Schema
const studentValidationZodSchema = z.object({
  password: z.string().min(6, 'password should be at last 6 character').optional(),
  student: z.object({ 
    name: userNameValidationZodSchema,
    gender: z.enum(['male', 'female', 'other'], {
      errorMap: (issue, _ctx) => {
        if (issue.code === 'invalid_enum_value') {
          return { message: "{VALUE} is not supported. The gender field can be one of the following: 'male', 'female' or 'other'" };
        }
        return { message: 'Gender is required' };
      },
    }),
    email: z.string().email('{VALUE} is not valid email'),
    dateOfBirth: z.string(),
    contactNumber: z.string()
      .min(11, 'The length of ContactNO should be 11')
      .max(11, 'The length of ContactNO should be 11')
      .refine((value) => /^[0-9]+$/.test(value), 'ContactNO should only contain numbers'),
    emergencyContactNo: z.string()
      .min(11, 'The length of ContactNO should be 11')
      .max(11, 'The length of ContactNO should be 11')
      .refine((value) => /^[0-9]+$/.test(value), 'ContactNO should only contain numbers'), 
    bloodGroup: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: guardianValidationZodSchema,
    localGuardian: localGuardianValidationZodSchema,
    studentStatus: z.enum(['active', 'blocked']).default('active'),
    profilePic: z.string(),
    academicSemester: z.string(),
    academicDepartment: z.string(),
    isDeleted: z.boolean().default(false)
  })
})
// type Student = z.infer<typeof studentValidationZodSchema>


export default studentValidationZodSchema;
