import { Router } from "express";
import validationRequest from "../../Middlewares/validator";
import { changePasswordValidationSchema, loginValidationSchema, refreshTokenValidationSchema } from "./auth.validation";
import { authControllers } from "./auth.controller";
import authValidator from "../../Middlewares/authValidator";
import { USER_ROLE } from "../user/user.constant";


const router = Router();


router.post(
    '/login',
    validationRequest(loginValidationSchema),
    authControllers.loginUser
)

router.post(
    '/refresh-token',
    validationRequest(refreshTokenValidationSchema),
    authControllers.refreshToken
)

router.post(
    '/change-password',
    authValidator(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    validationRequest(changePasswordValidationSchema),
    authControllers.changePassword
)


export const AuthRoutes = router;