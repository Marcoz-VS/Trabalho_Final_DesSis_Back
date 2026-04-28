import Joi from "joi";

// função auxiliar pra comparar horários
const isEndAfterStart = (value, helpers) => {
  const { start_time } = helpers.state.ancestors[0];

  if (!start_time) return value;

  const [startH, startM] = start_time.split(":").map(Number);
  const [endH, endM] = value.split(":").map(Number);

  const start = startH * 60 + startM;
  const end = endH * 60 + endM;

  if (end <= start) {
    return helpers.error("any.invalid");
  }

  return value;
};

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const createScheduleSchema = Joi.object({
  class_id: Joi.number().integer().required().messages({
    "number.base": "class_id deve ser um número",
    "number.integer": "class_id deve ser inteiro",
    "any.required": "class_id é obrigatório",
  }),

  subject: Joi.string().trim().min(2).max(100).required().messages({
    "string.base": "subject deve ser texto",
    "string.empty": "subject não pode ser vazio",
    "string.min": "subject deve ter no mínimo 2 caracteres",
    "any.required": "subject é obrigatório",
  }),

  day_of_week: Joi.string()
    .valid(
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    )
    .required()
    .messages({
      "any.only": "day_of_week inválido",
      "any.required": "day_of_week é obrigatório",
    }),

  start_time: Joi.string()
    .pattern(timeRegex)
    .required()
    .messages({
      "string.pattern.base": "start_time deve estar no formato HH:mm (00:00 até 23:59)",
      "any.required": "start_time é obrigatório",
    }),

  end_time: Joi.string()
    .pattern(timeRegex)
    .required()
    .custom(isEndAfterStart)
    .messages({
      "string.pattern.base": "end_time deve estar no formato HH:mm (00:00 até 23:59)",
      "any.invalid": "end_time deve ser maior que start_time",
      "any.required": "end_time é obrigatório",
    }),
});

const updateScheduleSchema = Joi.object({
  subject: Joi.string().trim().min(2).max(100),

  day_of_week: Joi.string().valid(
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ),

  start_time: Joi.string().pattern(timeRegex),

  end_time: Joi.string()
    .pattern(timeRegex)
    .custom(isEndAfterStart)
    .messages({
      "any.invalid": "end_time deve ser maior que start_time",
    }),
})
  .min(1)
  .messages({
    "object.min": "Envie pelo menos um campo para atualizar",
  });

export { createScheduleSchema, updateScheduleSchema };