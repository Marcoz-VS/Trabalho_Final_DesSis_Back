import express from 'express'
import StudentController from '../controllers/StudentController.js'

const StudentRouter = express.Router();

StudentRouter.get('/', StudentController.getAllStudents);
StudentRouter.get('/:id', StudentController.getStudentById);
StudentRouter.post('/', StudentController.createStudent)
StudentRouter.put('/:id', StudentController.updateStudent);
StudentRouter.delete('/:id', StudentController.deleteStudent);

export default StudentRouter;