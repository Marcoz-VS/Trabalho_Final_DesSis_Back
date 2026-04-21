import express from 'express'
import UsersController from '../controllers/UsersController.js'
import { Validate } from '../middlewares/ValidateMiddleware.js'
import { updateSchema, idSchema } from '../validations/UsersJoi.js';

const UsersRouter = express.Router();

UsersRouter.get('/', UsersController.getAll);
UsersRouter.get('/:id', Validate(idSchema), UsersController.getById);
UsersRouter.put('/:id', Validate(updateSchema, idSchema), UsersController.update);
UsersRouter.delete('/:id', Validate(idSchema), UsersController.delete);

export default UsersRouter;