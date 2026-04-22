import User from "../models/User.js";
import bcrypt from "bcrypt";
import { randomInt } from "crypto";

const RegisterController = {
  register: async (req, res) => {
    try {
      const { name } = req.body;

      const nameNormalizado = name.toLowerCase();

      let number = randomInt(0, 999);

      let email = `${nameNormalizado}` + `${number}` + "@estudante.com";

      const emailDuplicado = await User.findByPk(email);

      while (email === emailDuplicado) {
        number = randomInt(0, 999);

        email = `${nameNormalizado}` + `${number}` + "@estudante.com";
      }

      number = randomInt(100000, 1000000);

      const password = `${name}` + `${number}`

      const hash = await bcrypt.hash(password, 10);

      const resultado = await User.create({
        name,
        email: email,
        password: hash,
      });

      resultado.toJSON();
      resultado.password = password

      res.status(201).json({
        success: true,
        message: "Usuário criado com sucesso!",
        data: resultado,
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
