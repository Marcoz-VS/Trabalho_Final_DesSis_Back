import express from "express";
import EnrollmentController from "../controllers/EnrollmentController.js";
import { Validate } from "../middlewares/ValidateMiddleware.js";
import { enrollStudentSchema } from "../validations/EnrollmentJoi.js";
import { idParamSchema } from "../validations/IdJoi.js";
import { Role } from "../middlewares/RoleMiddleware.js";
import { Auth } from "../middlewares/AuthMiddleware.js";

const EnrollmentRouter = express.Router();

EnrollmentRouter.use(Auth)

EnrollmentRouter.get(
  "/student/:id",
  Role('admin', 'student'),
  Validate(idParamSchema, "params"),
  EnrollmentController.getEnrollmentByStudent,
);

EnrollmentRouter.get(
  "/class/:id",
  Role('admin', 'student'),
  Validate(idParamSchema, "params"),
  EnrollmentController.getEnrollmentByClass,
);

EnrollmentRouter.post(
  "/",
  Role('admin'),
  Validate(enrollStudentSchema),
  EnrollmentController.enrollStudent,
);

EnrollmentRouter.delete(
  "/:id",
  Role('admin'),
  Validate(idParamSchema, "params"),
  EnrollmentController.cancelEnrollment,
);

export default EnrollmentRouter;
