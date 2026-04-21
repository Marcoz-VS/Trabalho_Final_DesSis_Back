import express from 'express'
import EnrollmentController from '../controllers/EnrollmentController.js'
import { Validate } from '../middlewares/ValidateMiddleware.js'
import { idParamSchema, enrollStudentSchema } from '../validations/EnrollmentJoi'

const EnrollmentRouter = express.Router();

StudentRouter.get('/student/:id', Validate(idParamSchema), EnrollmentController.getEnrollmentByStudent);
StudentRouter.get('/class/:id', Validate(idParamSchema), EnrollmentController.getEnrollmentByClass);
StudentRouter.post('/', Validate(id), StudentController.createStudent)
StudentRouter.put('/:id', Validate(updateStudentSchema), StudentController.updateStudent);
StudentRouter.delete('/:id', StudentController.deleteStudent);