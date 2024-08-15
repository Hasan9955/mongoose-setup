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

router.get('/:id', CourseController.getSingleCourse)

router.delete('/:id', CourseController.deleteCourse)



// 2nd CourseFaculties routes

router.get('/getCourseFaculties', CourseController.getCourseFaculties)

router.put('/:courseId/assign-faculties', CourseController.assignFacultiesIntoCourse)

router.delete('/:courseId/delete-faculties', CourseController.deleteFacultiesFromCourse)

export const CourseRoute = router;