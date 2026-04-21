import express from "express";
import StudentController from "../controllers/StudentController.js";
import { Validate } from "../middlewares/ValidateMiddleware.js";
import {
  studentSchema,
  updateStudentSchema,
} from "../validations/StudentsJoi.js";
import { idParamSchema } from "../validations/IdJoi.js";

const StudentRouter = express.Router();

StudentRouter.get("/", StudentController.getAllStudents);

StudentRouter.get(
  "/:id",
  Validate(idParamSchema, "params"),
  StudentController.getStudentById,
);

StudentRouter.post(
  "/",
  Validate(studentSchema),
  StudentController.createStudent,
);

StudentRouter.patch(
  "/:id",
  Validate(idParamSchema, "params"),
  Validate(updateStudentSchema),
  StudentController.updateStudent,
);

StudentRouter.delete(
  "/:id",
  Validate(idParamSchema, "params"),
  StudentController.deleteStudent,
);

export default StudentRouter;
