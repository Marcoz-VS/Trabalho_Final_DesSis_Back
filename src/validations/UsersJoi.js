import Joi from "joi";

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(255).optional(),

  email: Joi.string().email().optional(),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .allow("")
    .optional(),

  role: Joi.string().valid("student", "admin", "professor").optional(),
}).min(1);

const firstTimeUpdateSchema = Joi.object({
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .allow("")
    .optional(),
}).min(1);

export { updateSchema, firstTimeUpdateSchema };