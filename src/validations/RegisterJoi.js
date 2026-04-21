import Joi from 'joi'

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "string.min": "O nome deve ter pelo menos 3 caracteres.",
    "any.required": "O nome é obrigatório.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Informe um e-mail válido.",
    "any.required": "O e-mail é obrigatório.",
  }),
  password_hash: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required()
    .messages({
      "string.pattern.base":
        "A senha deve conter entre 3 e 30 caracteres alfanuméricos.",
    }),
  role: Joi.string().valid("student", "admin", "professor").default("student"),
});

export { registerSchema }