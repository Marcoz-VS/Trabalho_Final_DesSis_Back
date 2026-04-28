import express from "express";
import StudentController from "../controllers/StudentController.js";
import { Validate } from "../middlewares/ValidateMiddleware.js";
import {
  studentSchema,
  updateStudentSchema,
} from "../validations/StudentsJoi.js";
import { idParamSchema } from "../validations/IdJoi.js";
import { Role } from "../middlewares/RoleMiddleware.js";
import { Auth } from "../middlewares/AuthMiddleware.js";

const StudentRouter = express.Router();

StudentRouter.use(Auth);

StudentRouter.get("/", Role("admin"), StudentController.getAllStudents);

StudentRouter.get(
  "/:id",
  Validate(idParamSchema, "params"),
  Role("admin", "student"),
  StudentController.getStudentById,
);

StudentRouter.post(
  "/",
  Validate(studentSchema),
  Role("admin"),
  StudentController.createStudent,
);

StudentRouter.put(
  "/:id",
  Validate(idParamSchema, "params"),
  
  Validate(updateStudentSchema),
  StudentController.updateStudent,
);

StudentRouter.delete(
  "/:id",
  Validate(idParamSchema, "params"),
  Role("admin"),
  StudentController.deleteStudent,
);

export default StudentRouter;
