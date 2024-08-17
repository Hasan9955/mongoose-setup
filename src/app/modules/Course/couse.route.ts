import express from 'express'
import validationRequest from '../../Middlewares/validator';
import { CourseValidations } from './course.validation';
import { CourseController } from './course.controller';
import authValidator from '../../Middlewares/authValidator';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();


router.post(
    '/create-course',
    authValidator(USER_ROLE.admin),
    validationRequest(CourseValidations.createCourseValidationSchema),
    CourseController.createCourse
)

router.patch(
    '/:id',
    authValidator(USER_ROLE.admin),
    validationRequest(
        CourseValidations.updateCourseValidationSchema
    ),
    CourseController.updateCourse
)

router.get('/', authValidator('admin', 'faculty', 'student'), CourseController.getAllCourses)

router.get('/:id', authValidator('admin', 'faculty', 'student'), CourseController.getSingleCourse)

router.delete('/:id', authValidator(USER_ROLE.admin), CourseController.deleteCourse)



// 2nd CourseFaculties routes

router.get('/getCourseFaculties', authValidator(USER_ROLE.admin), CourseController.getCourseFaculties)

router.put('/:courseId/assign-faculties', authValidator(USER_ROLE.admin), CourseController.assignFacultiesIntoCourse)

router.delete('/:courseId/delete-faculties', authValidator(USER_ROLE.admin), CourseController.deleteFacultiesFromCourse)

export const CourseRoute = router;