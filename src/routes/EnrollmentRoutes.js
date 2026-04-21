import express from "express";
import EnrollmentController from "../controllers/EnrollmentController.js";
import { Validate } from "../middlewares/ValidateMiddleware.js";
import { enrollStudentSchema } from "../validations/EnrollmentJoi.js";
import { idParamSchema } from "../validations/IdJoi.js";

const EnrollmentRouter = express.Router();

EnrollmentRouter.get(
  "/student/:id",
  Validate(idParamSchema, "params"),
  EnrollmentController.getEnrollmentByStudent,
);

EnrollmentRouter.get(
  "/class/:id",
  Validate(idParamSchema, "params"),
  EnrollmentController.getEnrollmentByClass,
);

EnrollmentRouter.post(
  "/",
  Validate(enrollStudentSchema),
  EnrollmentController.enrollStudent,
);

EnrollmentRouter.delete(
  "/:id",
  Validate(idParamSchema, "params"),
  EnrollmentController.cancelEnrollment,
);

export default EnrollmentRouter;
