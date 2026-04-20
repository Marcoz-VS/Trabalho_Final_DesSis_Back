import User from "../models/User.js";
import bcrypt from "bcrypt";
import Joi from "joi";

const schema = Joi.object({
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

const RegisterController = {
  register: async (req, res) => {
    try {
      const { error, value } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        return res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: error.details.map((detail) => detail.message),
        });
      }

      const { name, email, password_hash, role } = value;

      const hash = await bcrypt.hash(password_hash, 10);

      const resultado = await User.create({
        name,
        email,
        password_hash: hash,
        role,
      });

      const { password_hash: _, ...usuarioSemSenha } = resultado.toJSON();

      res.status(201).json({
        success: true,
        message: "Usuário criado com sucesso!",
        data: usuarioSemSenha,
      });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Erro interno ao processar o cadastro.",
        });
    }
  },
};

export default RegisterController;