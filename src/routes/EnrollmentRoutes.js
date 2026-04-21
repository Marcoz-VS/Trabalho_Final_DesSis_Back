import express from 'express'
import EnrollmentController from '../controllers/EnrollmentController.js'
import { Validate } from '../middlewares/ValidateMiddleware.js'
import { idParamSchema, enrollStudentSchema } from '../validations/EnrollmentJoi.js'

const EnrollmentRouter = express.Router();

EnrollmentRouter.get('/student/:id', Validate(idParamSchema), EnrollmentController.getEnrollmentByStudent);
EnrollmentRouter.get('/class/:id', Validate(idParamSchema), EnrollmentController.getEnrollmentByClass);
EnrollmentRouter.post('/', Validate(enrollStudentSchema), EnrollmentController.enrollStudent);
EnrollmentRouter.delete('/:id', Validate(idParamSchema), EnrollmentController.cancelEnrollment);

export default EnrollmentRouter;