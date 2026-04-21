import express from 'express'
import LoginController from '../controllers/LoginController.js'
import { loginSchema } from '../validations/LoginJoi.js';
import { Validate } from '../middlewares/ValidateMiddleware.js'

const LoginRouter = express.Router()

LoginRouter.post('/', Validate(loginSchema), LoginController.login);

export default LoginRouter;