import Joi from "joi";

const enrollStudentSchema = Joi.object({
  student_id: Joi.number().integer().required().messages({
    "number.base": "student_id deve ser um número",
    "number.integer": "student_id deve ser inteiro",
    "any.required": "student_id é obrigatório",
  }),

  class_id: Joi.number().integer().required().messages({
    "number.base": "class_id deve ser um número",
    "number.integer": "class_id deve ser inteiro",
    "any.required": "class_id é obrigatório",
  }),
});

export { enrollStudentSchema };
