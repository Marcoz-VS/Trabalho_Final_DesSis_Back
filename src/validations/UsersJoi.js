import Joi from "joi";

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(255).optional(),

  email: Joi.string().email().optional(),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .optional(),

}).min(1).unknown(false);

const firstTimeUpdateSchema = Joi.object({
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .optional(),
}).min(1).unknown(false);

const changePasswordSchema = Joi.object({
  current_password: Joi.string()
    .min(6)
    .max(100)
    .required()
    .messages({
      "string.base": "Senha atual deve ser um texto",
      "string.empty": "Senha atual é obrigatória",
      "string.min": "Senha atual inválida",
      "any.required": "Senha atual é obrigatória",
    }),

  new_password: Joi.string()
    .min(6)
    .max(100)
    .required()
    .invalid(Joi.ref("current_password"))
    .messages({
      "string.base": "Nova senha deve ser um texto",
      "string.empty": "Nova senha é obrigatória",
      "string.min": "Nova senha deve ter no mínimo 6 caracteres",
      "any.required": "Nova senha é obrigatória",
      "any.invalid": "Nova senha não pode ser igual à senha atual",
    }),
}).unknown(false);

const adminUserUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(255).optional(),
  email: Joi.string().email().optional(),
  role: Joi.string().valid("admin", "professor", "student").optional(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .optional(),
})
  .min(1)
  .unknown(false);

export {
  updateSchema,
  firstTimeUpdateSchema,
  changePasswordSchema,
  adminUserUpdateSchema,
};