import express from "express";
import ScheduleController from "../controllers/ScheduleController.js";
import { Auth } from "../middlewares/AuthMiddleware.js";
import { Role } from "../middlewares/RoleMiddleware.js";
import { Validate } from "../middlewares/ValidateMiddleware.js";
import { idParamSchema } from "../validations/IdJoi.js";
import { updateScheduleSchema, createScheduleSchema } from '../validations/ScheduleJoi.js'
import { Ownership } from "../middlewares/OwnershipMiddleware.js";
import StudentPolicy from "../policies/StudentPolicy.js";

const ScheduleRouter = express.Router();

ScheduleRouter.use(Auth);

ScheduleRouter.get(
  "/",
  Role("admin", "professor", "student"),
  ScheduleController.getAllSchedules
);

ScheduleRouter.get(
 "/student/:id",
  Role("student"),
  Ownership(StudentPolicy.byStudent, (req) => req.params.id),
  ScheduleController.getScheduleByStudent
)


ScheduleRouter.get(
  "/:id",
  Role("admin", "professor", "student"),
  Validate(idParamSchema, "params"),
  ScheduleController.getScheduleById
);

ScheduleRouter.post(
  "/",
  Role("admin"),
  Validate(createScheduleSchema),
  ScheduleController.createSchedule
);

ScheduleRouter.put(
  "/:id",
  Role("admin"),
  Validate(idParamSchema, "params"),
  Validate(updateScheduleSchema),
  ScheduleController.updateSchedule
);

ScheduleRouter.delete(
  "/:id",
  Role("admin"),
  Validate(idParamSchema, "params"),
  ScheduleController.deleteSchedule
);

export default ScheduleRouter;