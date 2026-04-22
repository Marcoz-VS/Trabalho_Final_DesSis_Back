import express from 'express';
import RegisterController from '../controllers/RegisterController.js';
import { registerSchema } from '../validations/RegisterJoi.js';
import { Validate } from '../middlewares/ValidateMiddleware.js';

const RegisterRouter = express.Router();

RegisterRouter.post("/student", Validate(registerSchema), RegisterController.register);
RegisterRouter.post("/professor", Validate(registerSchema), RegisterController.registerTeacher);

export default RegisterRouter;