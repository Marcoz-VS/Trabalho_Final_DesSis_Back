import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const LoginController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const emailNormalizado = email.toLowerCase();

      const user = await User.findOne({
        where: { email: emailNormalizado },
      });

      const senhaValida = user
        ? await bcrypt.compare(password, user.password)
        : false;

      if (!senhaValida) {
        return res.status(401).json({
          success: false,
          message: "E-mail ou senha incorretos.",
        });
      }

      const chaveSecreta = process.env.CHAVE_JWT;

      if (!chaveSecreta) {
        throw new Error("CHAVE_JWT não definida no .env");
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        chaveSecreta,
        { expiresIn: "2h" },
      );

      res.status(200).json({
        success: true,
        message: "Login realizado com sucesso!",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro ao tentar realizar login.",
        error: error.message,
      });
    }
  },
};

export default LoginController;
