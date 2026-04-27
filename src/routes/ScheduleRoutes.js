import express from "express";
import ScheduleController from "../controllers/ScheduleController.js";
import { Auth } from "../middlewares/AuthMiddleware.js";
import { Role } from "../middlewares/RoleMiddleware.js";
import { Validate } from "../middlewares/ValidateMiddleware.js";
import { idParamSchema } from "../validations/IdJoi.js";

const ScheduleRouter = express.Router();

ScheduleRouter.use(Auth);

ScheduleRouter.get(
  "/",
  Role("admin", "professor", "student"),
  ScheduleController.getAllSchedules
);


ScheduleRouter.get(
  "/:id",
  Role("admin", "professor", "student"),
  Validate(idParamSchema, "params"),
  ScheduleController.getScheduleById
);

ScheduleRouter.post(
  "/",
  Role("admin"),
  ScheduleController.createSchedule
);

ScheduleRouter.patch(
  "/:id",
  Role("admin"),
  Validate(idParamSchema, "params"),
  ScheduleController.updateSchedule
);

ScheduleRouter.delete(
  "/:id",
  Role("admin"),
  Validate(idParamSchema, "params"),
  ScheduleController.deleteSchedule
);

export default ScheduleRouter;