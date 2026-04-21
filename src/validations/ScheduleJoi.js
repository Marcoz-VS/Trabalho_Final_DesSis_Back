import Joi from 'joi';

const createScheduleSchema = Joi.object({
  class_id: Joi.number().integer().required().messages({
    'number.base': 'class_id deve ser um número',
    'number.integer': 'class_id deve ser inteiro',
    'any.required': 'class_id é obrigatório'
  }),

  subject: Joi.string().min(2).max(100).required().messages({
    'string.base': 'subject deve ser texto',
    'string.empty': 'subject não pode ser vazio',
    'string.min': 'subject deve ter no mínimo 2 caracteres',
    'any.required': 'subject é obrigatório'
  }),

  day_of_week: Joi.string()
    .valid('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday')
    .required()
    .messages({
      'any.only': 'day_of_week inválido',
      'any.required': 'day_of_week é obrigatório'
    }),

  start_time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      'string.pattern.base': 'start_time deve estar no formato HH:mm',
      'any.required': 'start_time é obrigatório'
    }),

  end_time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      'string.pattern.base': 'end_time deve estar no formato HH:mm',
      'any.required': 'end_time é obrigatório'
    })
});

const updateScheduleSchema = Joi.object({
  subject: Joi.string().min(2).max(100),

  day_of_week: Joi.string().valid(
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ),

  start_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),

  end_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
})
.min(1)
.messages({
  'object.min': 'Envie pelo menos um campo para atualizar'
});

export { createScheduleSchema, updateScheduleSchema };