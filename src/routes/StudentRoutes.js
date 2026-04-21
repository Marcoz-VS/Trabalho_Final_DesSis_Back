import express from 'express'
import StudentController from '../controllers/StudentController.js'
import { Validate } from '../middlewares/ValidateMiddleware.js'
import { studentSchema, updateStudentSchema } from '../validations/StudentsJoi.js';

const StudentRouter = express.Router();

StudentRouter.get('/', StudentController.getAllStudents);
StudentRouter.get('/:id', StudentController.getStudentById);
StudentRouter.post('/', Validate(studentSchema), StudentController.createStudent)
StudentRouter.put('/:id', Validate(updateStudentSchema), StudentController.updateStudent);
StudentRouter.delete('/:id', StudentController.deleteStudent);

export default StudentRouter;