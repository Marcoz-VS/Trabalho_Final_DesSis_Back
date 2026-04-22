import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Informe um e-mail válido",
    "any.required": "E-mail é obrigatório",
  }),

  password: Joi.string().required().messages({
    "any.required": "Senha é obrigatória",
  }),
});

export { loginSchema };
