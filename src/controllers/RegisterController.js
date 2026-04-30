import { User, Student, sequelize } from "../models/Index.js";
import bcrypt from "bcrypt";
import { generateCredentials } from "../utils/generateCredentials.js";
import { randomInt } from "crypto";

const RegisterController = {
  registerStudent: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const { name } = req.body;

      const { email, temporaryPassword } = await generateCredentials(
        name,
        "estudante.com"
      );

      const hash = await bcrypt.hash(temporaryPassword, 10);

      const user = await User.create(
        {
          name,
          email,
          password: hash,
          role: "student",
        },
        { transaction }
      );

      const registration = `STU-${Date.now().toString().slice(-6)}-${randomInt(1000,9999)}-${user.id}`;

      await Student.create(
        {
          user_id: user.id,
          registration: registration,
        },
        { transaction }
      );

      await transaction.commit();

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
      await transaction.rollback();

      return res.status(500).json({
        success: false,
        message: "Erro interno ao processar o cadastro.",
        error: error.message,
      });
    }
  },

registerTeacher: async (req, res) => {
  try {
    const { name, code } = req.body;

    const codigoSecreto = process.env.CODE;

    if (code !== codigoSecreto) {
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