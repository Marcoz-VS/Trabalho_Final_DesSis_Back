import Joi from "joi";

const createScoreSchema = Joi.object({
  enrollment_id: Joi.number().integer().required().messages({
    "number.base": "enrollment_id deve ser um número",
    "number.integer": "enrollment_id deve ser inteiro",
    "any.required": "enrollment_id é obrigatório",
  }),

  assessment: Joi.string().min(2).max(100).required().messages({
    "string.base": "assessment deve ser texto",
    "string.empty": "assessment não pode ser vazio",
    "string.min": "assessment deve ter no mínimo 2 caracteres",
    "any.required": "assessment é obrigatório",
  }),

  value: Joi.number().min(0).max(10).precision(2).required().messages({
    "number.base": "value deve ser um número",
    "number.min": "value não pode ser menor que 0",
    "number.max": "value não pode ser maior que 10",
    "any.required": "value é obrigatório",
  }),
}).unknown(false);

const updateScoreSchema = Joi.object({
  assessment: Joi.string().min(2).max(100),

  value: Joi.number().min(0).max(10).precision(2),
})
  .min(1)
  .messages({
    "object.min": "Envie pelo menos um campo para atualizar",
  }).unknown(false);

export { createScoreSchema, updateScoreSchema };
