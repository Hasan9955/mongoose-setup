import { Router } from "express";
import { offeredCourseControllers } from "./offeredCourse.controller";
import { createOfferedCourseValidationSchema, updateOfferedCourseValidationSchema } from "./offeredCourse.validation";
import validationRequest from "../../Middlewares/validator";


const router = Router();

router.get('/', offeredCourseControllers.getOfferedCourses)

router.get('/:id', offeredCourseControllers.getSingleOfferedCourses)

router.post('/create-offered-course', validationRequest(createOfferedCourseValidationSchema), offeredCourseControllers.createOfferedCourse)

router.patch('/:id', 
    validationRequest(updateOfferedCourseValidationSchema),
    offeredCourseControllers.UpdateOfferedCourse)

export const OfferedCourseRoutes = router;