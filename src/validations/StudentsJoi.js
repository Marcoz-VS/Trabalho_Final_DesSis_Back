import Joi from "joi";

const studentSchema = Joi.object({
  user_id: Joi.number().integer().required().messages({
    "number.base": "user_id deve ser um número",
    "number.integer": "user_id deve ser inteiro",
    "any.required": "user_id é obrigatório",
  }),

  registration: Joi.string().min(3).max(50).required().messages({
    "string.base": "registration deve ser texto",
    "string.empty": "registration não pode ser vazio",
    "string.min": "registration deve ter no mínimo 3 caracteres",
    "any.required": "registration é obrigatório",
  }),

  birth_date: Joi.date().iso().optional().messages({
    "date.base": "birth_date deve ser uma data válida",
    "date.format": "birth_date deve estar no formato YYYY-MM-DD",
  }),

  phone: Joi.string()
    .pattern(/^[0-9+\-\s()]+$/)
    .optional()
    .messages({
      "string.pattern.base": "phone contém caracteres inválidos",
    }),

  avatar_url: Joi.string().uri().optional().messages({
    "string.uri": "avatar_url deve ser uma URL válida",
  }),
}).unknown(false);

const updateStudentSchema = Joi.object({
  registration: Joi.string().min(3).max(50).optional(),
  birth_date: Joi.date().iso().allow(null).optional(),
  phone: Joi.string()
    .pattern(/^[0-9+\-\s()]+$/)
    .allow(null, "")
    .optional(),
  avatar_url: Joi.string().uri().allow(null, "").optional(),
})
  .min(1)
  .unknown(false);

export { studentSchema, updateStudentSchema };
