import { StudentController } from './student.controller';
import express from 'express'

const router = express.Router();


// will call controller func

router.get('/', StudentController.getAllStudents) 

router.patch('/update/:id', StudentController.updateAStudent)

router.get('/:studentId', StudentController.findAStudent)

router.delete('/delete/:studentId', StudentController.deleteAStudent)


export const StudentRoutes = router;




   
  