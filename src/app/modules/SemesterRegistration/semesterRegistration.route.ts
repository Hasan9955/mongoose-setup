import { Router } from "express";
import validationRequest from "../../Middlewares/validator";
import { createSemesterRegistrationValidationSchema, updateSemesterRegistrationValidationSchema } from "./semesterRegistration.validation";
import { semesterRegistrationControllers } from "./semesterRegistration.controller";


const router = Router();


router.get('/', semesterRegistrationControllers.getAllSemesterRegistrations)

router.get('/:id', semesterRegistrationControllers.getSingleSemesterRegistration)

router.post('/create-semester-registration',
    validationRequest(createSemesterRegistrationValidationSchema),
    semesterRegistrationControllers.createSemesterRegistration)

router.patch('/:id',
    validationRequest(updateSemesterRegistrationValidationSchema),
    semesterRegistrationControllers.updateSemesterRegistration)

export const semesterRegistrationRoutes = router;

