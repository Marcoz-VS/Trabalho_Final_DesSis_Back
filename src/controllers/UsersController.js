import User from "../models/User.js";
import bcrypt from "bcrypt";


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
       const { name, email, password_hash, role } = req.body;

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

      const dadosAtualizados = { name, email, password_hash, role };
      
      if (req.body.password_hash && req.body.password_hash.trim() !== "") {
        dadosAtualizados.password_hash = await bcrypt.hash(req.body.password_hash, 10);
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