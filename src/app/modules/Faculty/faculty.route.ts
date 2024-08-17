import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import validationRequest from '../../Middlewares/validator';
import authValidator from '../../Middlewares/authValidator';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/:id', authValidator('admin','faculty'), FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  authValidator('admin','faculty'),
  validationRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', authValidator('admin','faculty'), FacultyControllers.deleteFaculty);

router.get('/', authValidator(USER_ROLE.admin, USER_ROLE.faculty), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;