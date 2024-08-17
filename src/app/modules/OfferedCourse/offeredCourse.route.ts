import { Router } from "express";
import { offeredCourseControllers } from "./offeredCourse.controller";
import { createOfferedCourseValidationSchema, updateOfferedCourseValidationSchema } from "./offeredCourse.validation";
import validationRequest from "../../Middlewares/validator";
import authValidator from "../../Middlewares/authValidator";
import { USER_ROLE } from "../user/user.constant";


const router = Router();

router.get('/', 
    authValidator('admin','faculty', 'student'),
    offeredCourseControllers.getOfferedCourses)

router.get('/:id',
    authValidator('admin','faculty', 'student'),
    offeredCourseControllers.getSingleOfferedCourses)

router.post('/create-offered-course', authValidator(USER_ROLE.admin), validationRequest(createOfferedCourseValidationSchema), offeredCourseControllers.createOfferedCourse)

router.patch('/:id', 
    authValidator(USER_ROLE.admin),
    validationRequest(updateOfferedCourseValidationSchema),
    offeredCourseControllers.UpdateOfferedCourse)

export const OfferedCourseRoutes = router;