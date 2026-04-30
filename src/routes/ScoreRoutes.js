import express from "express";
import ScoreController from "../controllers/ScoreController.js";
import { Validate } from "../middlewares/ValidateMiddleware.js";
import {
  createScoreSchema,
  updateScoreSchema,
} from "../validations/ScoreJoi.js";
import { idParamSchema } from "../validations/IdJoi.js";
import { Role } from "../middlewares/RoleMiddleware.js";
import { Auth } from "../middlewares/AuthMiddleware.js";
import ScorePolicy from "../policies/ScorePolicy.js";
import { Ownership } from "../middlewares/OwnershipMiddleware.js";

const ScoreRouter = express.Router();

ScoreRouter.use(Auth);

ScoreRouter.get("/", Role("admin"), ScoreController.getAllScores);

ScoreRouter.get(
  "/enrollment/:id",
  Role("admin", "professor", "student"),
  Validate(idParamSchema, "params"),
  Ownership(ScorePolicy.byEnrollment, (req) => req.params.id),
  ScoreController.getScoresByEnrollment,
);

ScoreRouter.post(
  "/",
  Role("admin", "professor"),
  Validate(createScoreSchema),
  Ownership(ScorePolicy.byEnrollment, (req) => req.body.enrollment_id),
  ScoreController.createScore,
);

ScoreRouter.patch(
  "/:id",
  Role("admin", "professor"),
  Validate(idParamSchema, "params"),
  Validate(updateScoreSchema),
  Ownership(ScorePolicy.byScore, (req) => req.params.id),
  ScoreController.updateScore,
);

ScoreRouter.delete(
  "/:id",
  Role("admin"),
  Validate(idParamSchema, "params"),
  ScoreController.deleteScore,
);

export default ScoreRouter;
