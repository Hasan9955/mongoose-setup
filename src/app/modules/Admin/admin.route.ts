import express from 'express'; 
import { AdminControllers } from './admin.controller'; 
import { updateAdminValidationSchema } from './Admin.validation';
import validationRequest from '../../Middlewares/validator';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validationRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;