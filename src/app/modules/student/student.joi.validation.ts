import Joi from 'joi'



// Define the userNameValidationJoiSchema
const userNameValidationJoiSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .required()
        .regex(/^[A-Z][a-z]*$/)
        .message('"firstName" must be capitalized'),
    middleName: Joi.string().optional(),
    lastName: Joi.string()
        .required()
        .pattern(/^[A-Za-z]+$/)
        .message('"lastName" is not valid')
});

// Define the guardianSchema
const guardianValidationJoiSchema = Joi.object({
    fatherName: Joi.string().optional(),
    fatherOccupation: Joi.string().optional(),
    fatherContactNo: Joi.string().optional(),
    motherName: Joi.string().optional(),
    motherOccupation: Joi.string().optional(),
    motherContactNo: Joi.string().optional(),
});

// Define the localGuardianValidationJoiSchema
const localGuardianValidationJoiSchema = Joi.object({
    name: Joi.string().optional(),
    occupation: Joi.string().optional(),
    contactNo: Joi.string().optional(),
    address: Joi.string().optional(),
});

// Define the studentSchema
const studentValidationJoiSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationJoiSchema.required(),
    gender: Joi.string()
        .valid('male', 'female', 'other')
        .required() 
        .messages({
            'any.only': '{#label} is not supported. The gender field can be one of the following: \'male\', \'female\' or \'other\'',
            'any.required': 'Gender is required'
        }),
    email: Joi.string()
        .email()
        .messages({
            'string.email': '{#label} is not a valid email'
        }),
    dateOfBirth: Joi.string().optional(),
    contactNumber: Joi.string()
        .length(11) 
        .required()
        .messages({
            'string.length': 'The length of ContactNO should be 11',
            'any.required': 'ContactNO is required!'
        }),
    emergencyContactNo: Joi.string()
        .length(11)
        .required()
        .messages({
            'string.length': 'The length of ContactNO should be 11',
            'any.required': 'ContactNO is required!'
        }),
    bloodGroup: Joi.string().optional(),
    presentAddress: Joi.string().optional(),
    permanentAddress: Joi.string().optional(),
    guardian: guardianValidationJoiSchema.required(),
    localGuardian: localGuardianValidationJoiSchema.required(),
    studentStatus: Joi.string()
        .valid('active', 'blocked')
        .default('active'),
    profilePic: Joi.string().optional()
});


export default studentValidationJoiSchema