import Joi from 'joi';

export const idParamSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'ID deve ser um número',
    'number.integer': 'ID deve ser inteiro',
    'any.required': 'ID é obrigatório',
  }),
}).unknown(false);