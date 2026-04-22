import express from "express";
import UsersController from "../controllers/UsersController.js";
import { Validate } from "../middlewares/ValidateMiddleware.js";
import { updateSchema, firstTimeUpdateSchema } from "../validations/UsersJoi.js";
import { idParamSchema } from  "../validations/IdJoi.js";

const UsersRouter = express.Router();

UsersRouter.get("/", UsersController.getAll);

UsersRouter.get("/:id", Validate(idParamSchema, "params"), UsersController.getById);

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
  UsersController.updateFirsTimePassword,
);

UsersRouter.delete(
  "/:id",
  Validate(idParamSchema, "params"),
  UsersController.delete,
);

export default UsersRouter;
