import express from 'express'
import validationRequest from '../../Middlewares/validator';
import { CourseValidations } from './course.validation';
import { CourseController } from './course.controller';

const router = express.Router();


router.post(
    '/create-course',
    validationRequest(CourseValidations.createCourseValidationSchema),
    CourseController.createCourse
)

router.patch(
    '/:id',
    validationRequest(
        CourseValidations.updateCourseValidationSchema
    ),
    CourseController.updateCourse
)

router.get('/', CourseController.getAllCourses)

router.put('/:courseId/assign-faculties', CourseController.assignFaculties)

router.get('/:id', CourseController.getSingleCourse)

router.delete('/:id', CourseController.deleteCourse)

export const CourseRoute = router;