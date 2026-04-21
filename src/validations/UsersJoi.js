import Joi from "joi";

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(255).optional(),
  email: Joi.string().email().optional(),
  password_hash: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .allow("")
    .optional(),
  cpf: Joi.string()
    .pattern(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)
    .optional(),
  role: Joi.string().valid("student", "admin", "professor").optional(),
}).min(1);

const idSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export { updateSchema, idSchema };
