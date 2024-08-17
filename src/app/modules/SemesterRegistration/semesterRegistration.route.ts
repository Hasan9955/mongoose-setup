import { Router } from "express";
import validationRequest from "../../Middlewares/validator";
import { createSemesterRegistrationValidationSchema, updateSemesterRegistrationValidationSchema } from "./semesterRegistration.validation";
import { semesterRegistrationControllers } from "./semesterRegistration.controller";
import authValidator from "../../Middlewares/authValidator";
import { USER_ROLE } from "../user/user.constant";


const router = Router();


router.get('/', authValidator('admin','faculty', 'student'), semesterRegistrationControllers.getAllSemesterRegistrations)

router.get('/:id', authValidator('admin','faculty', 'student'), semesterRegistrationControllers.getSingleSemesterRegistration)

router.post('/create-semester-registration',
    authValidator(USER_ROLE.admin),
    validationRequest(createSemesterRegistrationValidationSchema),
    semesterRegistrationControllers.createSemesterRegistration)

router.patch('/:id',
    authValidator(USER_ROLE.admin),
    validationRequest(updateSemesterRegistrationValidationSchema),
    semesterRegistrationControllers.updateSemesterRegistration)

router.delete('/:id',
    authValidator(USER_ROLE.admin),
    semesterRegistrationControllers.deleteSemesterRegistration
)

export const semesterRegistrationRoutes = router;

