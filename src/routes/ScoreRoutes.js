import express from 'express'
import ScoreController from '../controllers/ScoreController.js';

const ScoreRouter = express.Router();

ScoreRouter.get('/', ScoreController.getAllScore);
ScoreRouter.post('/', ScoreController.createScore);

export default ScoreRouter;