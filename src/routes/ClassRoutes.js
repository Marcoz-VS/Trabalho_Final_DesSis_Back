import express from 'express'
import ClassController from '../controllers/ClassController.js'
import { Validate } from '../middlewares/ValidateMiddleware.js'
import { createClassSchema, updateClassSchema } from '../validations/ClassJoi.js';

const ClassRouter = express.Router();

ClassRouter.get('/', ClassController.getAllClasses);
ClassRouter.get('/:id', ClassController.getClassById);
ClassRouter.post('/', Validate(createClassSchema), ClassController.createClass)
ClassRouter.put('/:id', Validate(updateClassSchema), ClassController.updateClass);
ClassRouter.delete('/:id', ClassController.deleteClass);

export default ClassRouter;