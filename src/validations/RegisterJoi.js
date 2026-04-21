import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "string.min": "O nome deve ter pelo menos 3 caracteres.",
    "any.required": "O nome é obrigatório.",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Informe um e-mail válido.",
    "any.required": "O e-mail é obrigatório.",
  }),

  password: Joi.string().min(3).max(30).required().messages({
    "string.min": "A senha deve ter no mínimo 3 caracteres.",
    "any.required": "A senha é obrigatória.",
  }),

  role: Joi.string().valid("student", "admin", "professor").default("student"),
});

export { registerSchema };
