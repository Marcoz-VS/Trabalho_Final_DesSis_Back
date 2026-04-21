import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const chaveSecreta = process.env.CHAVE_JWT;

const LoginController = {
  login: async (req, res) => {
    try {

      const { email, password_hash } = req.body
      const resultado = await User.findOne({ where: { email } });


      if (!resultado || !(await bcrypt.compare(password_hash, resultado.password_hash))) {
        return res.status(401).json({
          success: false,
          message: "E-mail ou senha incorretos.",
        });
      }

      const token = jwt.sign(
        { id: resultado.id, email: resultado.email, role: resultado.role },
        chaveSecreta,
        { expiresIn: "2h" },
      );


      res.status(200).json({ success: true, message: "Login realizado com sucesso!", token, user:{ id:resultado.id, name:resultado.name, email: resultado.email, role: resultado.role} });

    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao tentar realizar login." });
    }
  },
};

export default LoginController;
