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
import { Ownership } from "../middlewares/OwnershipMiddleware.js";
import StudentPolicy from "../policies/StudentPolicy.js";

const StudentRouter = express.Router();

StudentRouter.use(Auth);

StudentRouter.get("/", Role("admin"), StudentController.getAllStudents);

StudentRouter.get(
  "/:id",
  Role("admin", "student"),
  Validate(idParamSchema, "params"),
  Ownership(StudentPolicy.byStudent, (req) => req.params.id),
  StudentController.getStudentById,
);

StudentRouter.post(
  "/",
  Role("admin"),
  Validate(studentSchema),
  StudentController.createStudent,
);

StudentRouter.put(
  "/:id",
  Role("admin", "student"),
  Validate(idParamSchema, "params"),
  Validate(updateStudentSchema),
  Ownership(StudentPolicy.byStudent, (req) => req.params.id),
  StudentController.updateStudent,
);

StudentRouter.delete(
  "/:id",
  Role("admin"),
  Validate(idParamSchema, "params"),
  StudentController.deleteStudent,
);

export default StudentRouter;
