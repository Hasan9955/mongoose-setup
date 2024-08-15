import { Router } from "express";
import validationRequest from "../../Middlewares/validator";
import { semesterRegistrationValidationSchema } from "./semesterRegistration.validation";
import { semesterRegistrationControllers } from "./semesterRegistration.controller";


const router = Router();


router.get('/', semesterRegistrationControllers.getAllSemesterRegistrations)

router.get('/:id', semesterRegistrationControllers.getSingleSemesterRegistration)

router.post('/create-semester-registration',
    validationRequest(semesterRegistrationValidationSchema),
    semesterRegistrationControllers.createSemesterRegistration)


export const semesterRegistrationRoutes = router;

