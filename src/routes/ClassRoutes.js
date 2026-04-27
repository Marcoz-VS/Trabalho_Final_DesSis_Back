import express from "express";
import ClassController from "../controllers/ClassController.js";
import { Validate } from "../middlewares/ValidateMiddleware.js";
import {
  createClassSchema,
  updateClassSchema,
} from "../validations/ClassJoi.js";
import { idParamSchema } from "../validations/IdJoi.js";
import { Role } from "../middlewares/RoleMiddleware.js";
import { Auth } from "../middlewares/AuthMiddleware.js";

const ClassRouter = express.Router();

ClassRouter.use(Auth);

ClassRouter.get("/", ClassController.getAllClasses);

ClassRouter.get(
  "/:id",
  Validate(idParamSchema, "params"),
  ClassController.getClassById,
);

ClassRouter.post("/", Role('admin'), Validate(createClassSchema), ClassController.createClass);

ClassRouter.put(
  "/:id",
  Role('admin'),
  Validate(idParamSchema, "params"),
  Validate(updateClassSchema),
  ClassController.updateClass,
);

ClassRouter.delete(
  "/:id",
  Role('admin'),
  Validate(idParamSchema, "params"),
  ClassController.deleteClass,
);

export default ClassRouter;
