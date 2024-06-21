import { Router } from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validationRequest from "../../Middlewares/validator";
import academicSemesterZodSchema from "./academicSemester.validation";

const router = Router();

router.post('/create-academic-semester', validationRequest(academicSemesterZodSchema), AcademicSemesterControllers.createAcademicSemester)

router.get('/', AcademicSemesterControllers.getAllAcademicSemester)

router.get('/:id', AcademicSemesterControllers.getAnAcademicSemester)

router.put('/:id', AcademicSemesterControllers.updateAnAcademicSemester)



export const AcademicSemesterRoutes = router;