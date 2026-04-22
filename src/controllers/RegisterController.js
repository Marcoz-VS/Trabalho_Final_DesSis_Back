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
  registerTeacher: async (req, res) => {
    try {
      const { name, codigo } = req.body;

      const codigoSecreto = process.env.CODE

      if (codigo !== codigoSecreto) {
          return res.status(400).json({
              success: false,
              message: "Código errado, entre em contato com a secretária para mais informações"
          })
      }

      const nameNormalizado = name.toLowerCase();

      let number = randomInt(0, 999);

      let email = `${nameNormalizado}` + `${number}` + "@professor.com";

      const emailDuplicado = await User.findByPk(email);

      while (email === emailDuplicado) {
        number = randomInt(0, 999);

        email = `${nameNormalizado}` + `${number}` + "@professor.com";
      }

      number = randomInt(100000, 1000000);

      const password = `${name}` + `${number}`

      const hash = await bcrypt.hash(password, 10);

      const resultado = await User.create({
        name,
        email: email,
        password: hash,
        role: "professor"
      });

      resultado.toJSON();
      resultado.password = password

      res.status(201).json({
        success: true,
        message: "Professor criado com sucesso!",
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
