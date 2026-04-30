import { User } from "../models/Index.js";
import bcrypt from "bcrypt";
import { generateCredentials } from "../utils/generateCredentials.js";

const RegisterController = {
  registerStudent: async (req, res) => {
    try {
      const { name } = req.body;

      const { email, temporaryPassword } = await generateCredentials(
        name,
        "estudante.com",
      );

      const hash = await bcrypt.hash(temporaryPassword, 10);

      const user = await User.create({
        name,
        email,
        password: hash,
      });

      return res.status(201).json({
        success: true,
        message: "Usuário criado com sucesso!",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          temporaryPassword,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro interno ao processar o cadastro.",
        error: error.message,
      });
    }
  },

  registerTeacher: async (req, res) => {
    try {
      const { name, codigo } = req.body;

      const codigoSecreto = process.env.CODE;

      if (codigo !== codigoSecreto) {
        return res.status(403).json({
          success: false,
          message:
            "Código errado, entre em contato com a secretária para mais informações",
        });
      }

      const { email, temporaryPassword } = await generateCredentials(
        name,
        "professor.com",
      );

      const hash = await bcrypt.hash(temporaryPassword, 10);

      const user = await User.create({
        name,
        email,
        password: hash,
        role: "professor",
      });

      return res.status(201).json({
        success: true,
        message: "Professor criado com sucesso!",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          temporaryPassword,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro interno ao processar o cadastro.",
        error: error.message,
      });
    }
  },
};

export default RegisterController;