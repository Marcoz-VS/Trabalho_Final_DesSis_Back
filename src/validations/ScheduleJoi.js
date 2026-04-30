import Joi from "joi";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const isEndAfterStart = (value, helpers) => {
  const { start_time } = helpers.state.ancestors[0];

  if (!start_time || !value) return value;

  const [sh, sm] = start_time.split(":").map(Number);
  const [eh, em] = value.split(":").map(Number);

  const start = sh * 60 + sm;
  const end = eh * 60 + em;

  if (end <= start) {
    return helpers.error("any.invalid");
  }

  return value;
};

const createScheduleSchema = Joi.object({
  class_id: Joi.number().integer().required().messages({
    "any.required": "class_id é obrigatório",
    "number.base": "class_id deve ser número",
    "number.integer": "class_id deve ser inteiro",
  }),

  subject: Joi.string().min(2).max(100).required().messages({
    "any.required": "subject é obrigatório",
    "string.min": "subject muito curto",
  }),

  day_of_week: Joi.string()
    .valid("monday", "tuesday", "wednesday", "thursday", "friday", "saturday")
    .required()
    .messages({
      "any.required": "day_of_week é obrigatório",
      "any.only": "day_of_week inválido",
    }),

  start_time: Joi.string().pattern(timeRegex).required().messages({
    "any.required": "start_time é obrigatório",
    "string.pattern.base": "formato inválido (HH:mm)",
  }),

  end_time: Joi.string()
    .pattern(timeRegex)
    .required()
    .custom(isEndAfterStart)
    .messages({
      "any.required": "end_time é obrigatório",
      "any.invalid": "end_time deve ser maior que start_time",
      "string.pattern.base": "formato inválido (HH:mm)",
    }),
});

const updateScheduleSchema = Joi.object({
  subject: Joi.string().min(2).max(100),
  day_of_week: Joi.string().valid(
    "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
  ),
  start_time: Joi.string().pattern(timeRegex),
  end_time: Joi.string().pattern(timeRegex),
})
  .min(1)
  .custom((value, helpers) => {
    if (value.start_time && value.end_time) {
      const [sh, sm] = value.start_time.split(":").map(Number);
      const [eh, em] = value.end_time.split(":").map(Number);

      if (eh * 60 + em <= sh * 60 + sm) {
        return helpers.error("any.invalid");
      }
    }
    return value;
  });

export { createScheduleSchema, updateScheduleSchema };