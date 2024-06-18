import { StudentController } from './student.controller';
import express from 'express'

const router = express.Router();


// will call controller func

router.get('/', StudentController.getAllStudents) 

router.put('/update/:id', StudentController.updateAStudent)

router.get('/:id', StudentController.findAStudent)

router.delete('/delete/:id', StudentController.deleteAStudent)


export const StudentRoutes = router;




   
  