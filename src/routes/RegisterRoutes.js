import express from 'express';
import RegisterController from '../controllers/RegisterController.js';
import { registerSchema } from '../validations/RegisterJoi.js';
import { Validate } from '../middlewares/ValidateMiddleware.js';

const RegisterRouter = express.Router();

RegisterRouter.post('/', Validate(registerSchema), RegisterController.register);

export default RegisterRouter;