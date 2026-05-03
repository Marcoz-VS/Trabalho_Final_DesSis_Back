import express from "express";
import UsersController from "../controllers/UsersController.js";
import { Validate } from "../middlewares/ValidateMiddleware.js";
import {
  firstTimeUpdateSchema,
  changePasswordSchema,
  adminUserUpdateSchema,
} from "../validations/UsersJoi.js";
import { idParamSchema } from "../validations/IdJoi.js";
import { Role } from "../middlewares/RoleMiddleware.js";
import { Auth } from "../middlewares/AuthMiddleware.js";
import { Ownership } from "../middlewares/OwnershipMiddleware.js";
import UserPolicy from "../policies/UserPolicy.js";

const UsersRouter = express.Router();

UsersRouter.use(Auth);

UsersRouter.get("/", Role("admin"), UsersController.getAll);

UsersRouter.get(
  "/:id",
  Role("admin", "student", "professor"),
  Validate(idParamSchema, "params"),
  Ownership(UserPolicy.byUser, (req) => req.params.id),
  UsersController.getById,
);

UsersRouter.put(
  "/change-password",
  Role("admin", "student", "professor"),
  Validate(changePasswordSchema),
  UsersController.changePassword
);


UsersRouter.patch(
  "/firstTimeUpdate/:id",
  Role("admin", "student", "professor"),
  Validate(idParamSchema, "params"),
  Validate(firstTimeUpdateSchema),
  Ownership(UserPolicy.byUser, (req) => req.params.id),
  UsersController.updateFirstTimePassword,
);

UsersRouter.put(
  "/:id",
  Role("admin"),
  Validate(idParamSchema, "params"),
  Validate(adminUserUpdateSchema),
  UsersController.updateByAdmin,
);

UsersRouter.delete(
  "/:id",
  Role("admin"),
  Validate(idParamSchema, "params"),
  UsersController.delete,
);

export default UsersRouter;
