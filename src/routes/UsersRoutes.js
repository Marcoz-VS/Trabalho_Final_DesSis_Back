import express from 'express'
import UsersController from '../controllers/UsersController.js'

const UsersRouter = express.Router();

UsersRouter.get('/', UsersController.getAll);
UsersRouter.get('/:id', UsersController.getById);
UsersRouter.put('/:id', UsersController.update);
UsersRouter.delete('/:id', UsersController.delete);

export default UsersRouter;