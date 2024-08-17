import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import validationRequest from '../../Middlewares/validator';
import authValidator from '../../Middlewares/authValidator';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validationRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', authValidator(USER_ROLE.admin, USER_ROLE.faculty), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;