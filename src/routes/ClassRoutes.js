import express from "express";
import ClassController from "../controllers/ClassController.js";
import { Validate } from "../middlewares/ValidateMiddleware.js";
import {
  createClassSchema,
  updateClassSchema,
} from "../validations/ClassJoi.js";
import { idParamSchema } from "../validations/IdJoi.js";

const ClassRouter = express.Router();

ClassRouter.get("/", ClassController.getAllClasses);

ClassRouter.get(
  "/:id",
  Validate(idParamSchema, "params"),
  ClassController.getClassById,
);

ClassRouter.post("/", Validate(createClassSchema), ClassController.createClass);

ClassRouter.patch(
  "/:id",
  Validate(idParamSchema, "params"),
  Validate(updateClassSchema),
  ClassController.updateClass,
);

ClassRouter.delete(
  "/:id",
  Validate(idParamSchema, "params"),
  ClassController.deleteClass,
);

export default ClassRouter;
