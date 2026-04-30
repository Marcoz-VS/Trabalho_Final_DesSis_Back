import Joi from "joi";

const registerStudentSchema = Joi.object({
  name: Joi.string().trim().min(3).max(255).required().messages({
    "string.base": "Nome deve ser texto",
    "string.empty": "Nome é obrigatório",
    "string.min": "Nome deve ter pelo menos 3 caracteres",
    "string.max": "Nome deve ter no máximo 255 caracteres",
    "any.required": "Nome é obrigatório",
  }),
}).unknown(false);

const registerTeacherSchema = Joi.object({
  name: Joi.string().trim().min(3).max(255).required().messages({
    "string.base": "Nome deve ser texto",
    "string.empty": "Nome é obrigatório",
    "string.min": "Nome deve ter pelo menos 3 caracteres",
    "string.max": "Nome deve ter no máximo 255 caracteres",
    "any.required": "Nome é obrigatório",
  }),

  code: Joi.string().trim().min(3).required().messages({
    "string.base": "Código deve ser texto",
    "string.empty": "Código é obrigatório",
    "string.min": "Código deve ter pelo menos 3 caracteres",
    "any.required": "Código é obrigatório",
  }),
}).unknown(false);

export { registerStudentSchema, registerTeacherSchema };
