import User from "../models/User.js";
import bcrypt from "bcrypt";
import Joi from "joi";

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(255).optional(),
  email: Joi.string().email().optional(),
  password_hash: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .allow("")
    .optional(),
  cpf: Joi.string()
    .pattern(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)
    .optional(),
  role: Joi.string().valid("student", "admin", "professor").optional(),
}).min(1);

const idSchema = Joi.object({
  id: Joi.number().integer().required()
});

const UsersController = {
  getAll: async (req, res) => {
    try {
      const resultado = await User.findAll({
        attributes: { exclude: ["password_hash"] },
      });
      res.status(200).json({ success: true, data: resultado });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao listar usuários.", error: error.message });
    }
  },

    getById: async (req, res) => {
    try {
      const { error } = idSchema.validate(req.params);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      const { id } = req.params;
      const resultado = await User.findByPk(id, { attributes: { exclude: ["password_hash"] } });

      if (!resultado) return res.status(404).json({ success: false, message: "Usuário não encontrado." });

      res.status(200).json({ success: true, data: resultado });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar usuário." });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      
      const { error, value } = updateSchema.validate(req.body, { abortEarly: false });

       const { name, email, password_hash, role } = value;

      if (error) {
        return res.status(400).json({
          success: false,
          errors: error.details.map((d) => d.message),
        });
      }

      const usuarioExistente = await User.findByPk(id);
      if (!usuarioExistente) {
        return res.status(404).json({ success: false, message: "Usuário não encontrado." });
      }

      const dadosAtualizados = { ...value };
      
      if (value.password_hash && value.password_hash.trim() !== "") {
        dadosAtualizados.password_hash = await bcrypt.hash(value.password_hash, 10);
      } else {
        delete dadosAtualizados.password_hash;
      }

      await User.update(dadosAtualizados, { where: { id } });

      res.status(200).json({ success: true, message: "Perfil atualizado com sucesso!" });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ success: false, message: "E-mail ou CPF já cadastrado." });
      }
      res.status(500).json({ success: false, error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { error } = idSchema.validate(req.params);
      if (error) return res.status(400).json({ success: false, message: "ID inválido." });

      const { id } = req.params;
      const deletado = await User.destroy({ where: { id } });

      if (!deletado) return res.status(404).json({ success: false, message: "Usuário não encontrado." });

      res.status(200).json({ success: true, message: "Usuário removido com sucesso!" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao excluir usuário." });
    }
  },
}

export default UsersController