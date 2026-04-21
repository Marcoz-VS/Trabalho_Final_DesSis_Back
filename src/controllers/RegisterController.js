import User from "../models/User.js";
import bcrypt from "bcrypt";

const RegisterController = {
  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      const userExistente = await User.findOne({ where: { email } });

      if (userExistente) {
        return res.status(409).json({
          success: false,
          message: "E-mail já cadastrado.",
        });
      }

      const hash = await bcrypt.hash(password, 10);

      const resultado = await User.create({
        name,
        email,
        password: hash,
        role: role || "student",
      });

      const { password: _, ...usuarioSemSenha } = resultado.toJSON();

      res.status(201).json({
        success: true,
        message: "Usuário criado com sucesso!",
        data: usuarioSemSenha,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro interno ao processar o cadastro.",
        error: error.message,
      });
    }
  },
};

export default RegisterController;
