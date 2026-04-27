import express from "express";
import UsersController from "../controllers/UsersController.js";
import { Validate } from "../middlewares/ValidateMiddleware.js";
import { updateSchema, firstTimeUpdateSchema } from "../validations/UsersJoi.js";
import { idParamSchema } from  "../validations/IdJoi.js";
import {Role} from '../middlewares/RoleMiddleware.js';
import {Auth} from '../middlewares/AuthMiddleware.js';

const UsersRouter = express.Router()

UsersRouter.use(Auth);

UsersRouter.get("/", Role('admin'), UsersController.getAll);

UsersRouter.get("/:id", Role('admin', 'student', 'professor'), Validate(idParamSchema, "params"), UsersController.getById);

UsersRouter.put(
  "/:id",
  Validate(idParamSchema, "params"),
  Validate(updateSchema),
  UsersController.update,
);

UsersRouter.patch(
  "/firstTimeUpdate/:id",
  Validate(idParamSchema, "params"),
  Validate(firstTimeUpdateSchema),
  UsersController.updateFirstTimePassword,
);

UsersRouter.delete(
  "/:id",
  Role('admin'),
  Validate(idParamSchema, "params"),
  UsersController.delete,
);

export default UsersRouter;
