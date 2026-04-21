import Joi from "joi";

const createClassSchema = Joi.object({
  professor_id: Joi.number().integer().required().messages({
    "number.base": "professor_id deve ser um número",
    "number.integer": "professor_id deve ser inteiro",
    "any.required": "professor_id é obrigatório",
  }),

  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "name deve ser texto",
    "string.empty": "name não pode ser vazio",
    "string.min": "name deve ter no mínimo 3 caracteres",
    "string.max": "name deve ter no máximo 100 caracteres",
    "any.required": "name é obrigatório",
  }),

  description: Joi.string().max(1000).allow(null, "").optional(),

  year: Joi.number().integer().min(2000).max(2100).required().messages({
    "number.base": "year deve ser um número",
    "number.integer": "year deve ser inteiro",
    "number.min": "year inválido",
    "number.max": "year inválido",
    "any.required": "year é obrigatório",
  }),

  semester: Joi.number().integer().valid(1, 2).required().messages({
    "number.base": "semester deve ser número",
    "number.integer": "semester deve ser inteiro",
    "any.only": "semester deve ser 1 ou 2",
    "any.required": "semester é obrigatório",
  }),
});

const updateClassSchema = Joi.object({
  professor_id: Joi.number().integer(),

  name: Joi.string().min(3).max(100),

  description: Joi.string().max(1000).allow(null, ""),

  year: Joi.number().integer().min(2000).max(2100),

  semester: Joi.number().integer().valid(1, 2),
})
  .min(1)
  .messages({
    "object.min": "Envie pelo menos um campo para atualizar",
  });

export { createClassSchema, updateClassSchema };
