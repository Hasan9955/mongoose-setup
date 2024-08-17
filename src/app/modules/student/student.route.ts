import authValidator from '../../Middlewares/authValidator';
import { StudentController } from './student.controller';
import express from 'express'

const router = express.Router();


// will call controller func

router.get('/', authValidator('admin','faculty', 'student'), StudentController.getAllStudents) 

router.patch('/update/:id', authValidator('admin','faculty', 'student'), StudentController.updateAStudent)

router.get('/:studentId', authValidator('admin','faculty', 'student'), StudentController.findAStudent)

router.delete('/delete/:studentId', authValidator('admin', 'student'), StudentController.deleteAStudent)


export const StudentRoutes = router;




   
  