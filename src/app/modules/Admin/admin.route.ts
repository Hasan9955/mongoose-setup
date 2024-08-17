import express from 'express'; 
import { AdminControllers } from './admin.controller';  
import validationRequest from '../../Middlewares/validator';
import { updateAdminValidationSchema } from './admin.validation';
import authValidator from '../../Middlewares/authValidator';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', authValidator(USER_ROLE.admin), AdminControllers.getAllAdmins);

router.get('/:id', authValidator(USER_ROLE.admin), AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  authValidator(USER_ROLE.admin),
  validationRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', authValidator(USER_ROLE.admin), AdminControllers.deleteAdmin);

export const AdminRoutes = router;

