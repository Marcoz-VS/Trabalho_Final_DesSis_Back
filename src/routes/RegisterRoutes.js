import express from "express";
import RegisterController from "../controllers/RegisterController.js";
import {
  registerStudentSchema,
  registerTeacherSchema,
} from "../validations/RegisterJoi.js";
import { Validate } from "../middlewares/ValidateMiddleware.js";

const RegisterRouter = express.Router();

RegisterRouter.post(
  "/student",
  Validate(registerStudentSchema),
  RegisterController.registerStudent,
);

RegisterRouter.post(
  "/professor",
  Validate(registerTeacherSchema),
  RegisterController.registerTeacher,
);

export default RegisterRouter;
