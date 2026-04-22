import express from "express";
import ScoreController from "../controllers/ScoreController.js";
import { Validate } from "../middlewares/ValidateMiddleware.js";
import {
  createScoreSchema,
  updateScoreSchema,
} from "../validations/ScoreJoi.js";
import { idParamSchema } from "../validations/IdJoi.js";

const ScoreRouter = express.Router();

ScoreRouter.get("/", ScoreController.getAllScores);

ScoreRouter.get(
  "/enrollment/:id",
  Validate(idParamSchema, "params"),
  ScoreController.getScoresByEnrollment,
);

ScoreRouter.post("/", Validate(createScoreSchema), ScoreController.createScore);

ScoreRouter.patch(
  "/:id",
  Validate(idParamSchema, "params"),
  Validate(updateScoreSchema),
  ScoreController.updateScore,
);

ScoreRouter.delete(
  "/:id",
  Validate(idParamSchema, "params"),
  ScoreController.deleteScore,
);

export default ScoreRouter;
