import { Router } from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validationRequest from "../../Middlewares/validator";
import academicSemesterZodSchema from "./academicSemester.validation";
import authValidator from "../../Middlewares/authValidator";

const router = Router();

router.post('/create-academic-semester',
    authValidator('admin'),
     validationRequest(academicSemesterZodSchema), 
     AcademicSemesterControllers.createAcademicSemester
    )

router.get('/',
    authValidator('admin', 'student', 'faculty'),
     AcademicSemesterControllers.getAllAcademicSemester
    )

router.get('/:id',
    authValidator('admin', 'student', 'faculty'),
     AcademicSemesterControllers.getAnAcademicSemester
    )

router.put('/:id',
    authValidator('admin'),
     AcademicSemesterControllers.updateAnAcademicSemester
    )



export const AcademicSemesterRoutes = router;