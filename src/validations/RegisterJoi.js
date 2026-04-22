import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "string.min": "O nome deve ter pelo menos 3 caracteres.",
    "any.required": "O nome é obrigatório.",
  }),
  codigo: Joi.string().min(3).messages({
    "string.min": "O codigo deve ter pelo menos 3 caracteres."
  })
});

export { registerSchema };
