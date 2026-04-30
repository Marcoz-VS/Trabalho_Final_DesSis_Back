import { User } from "../models/Index.js";
import bcrypt from "bcrypt";

const UsersController = {
  getAll: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });

      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro ao listar usuários.",
        error: error.message,
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro ao buscar usuário.",
        error: error.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { password, ...rest } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      const updatedData = { ...rest };

      if (password && password.trim()) {
        updatedData.password = await bcrypt.hash(password, 10);
      }

      await user.update(updatedData);

      return res.status(200).json({
        success: true,
        message: "Perfil atualizado com sucesso!",
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
          success: false,
          message: "E-mail já cadastrado.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Erro ao atualizar usuário.",
        error: error.message,
      });
    }
  },

  updateFirstTimePassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { password } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      const updatedData = {};

      if (user.firstTime) {
        updatedData.firstTime = false;
      }

      if (password && password.trim()) {
        updatedData.password = await bcrypt.hash(password, 10);
      }

      await user.update(updatedData);

      return res.status(200).json({
        success: true,
        message: "Senha alterada com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro ao atualizar senha.",
        error: error.message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await User.destroy({
        where: { id },
      });

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Usuário removido com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro ao excluir usuário.",
        error: error.message,
      });
    }
  },
};

export default UsersController;
