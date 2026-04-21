import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password_hash: Joi.string().required()
});

export { loginSchema }