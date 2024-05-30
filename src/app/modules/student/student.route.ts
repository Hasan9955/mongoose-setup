import { StudentController } from './student.controller';
import express from 'express'

const router = express.Router();


// will call controller func

router.get('/', StudentController.getAllStudents)

router.post('/create-student', StudentController.createStudent)

router.get('/:id', StudentController.findAStudent)


export const StudentRoutes = router;