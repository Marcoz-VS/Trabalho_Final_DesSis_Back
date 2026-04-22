import { User } from "../models/Index.js";
import bcrypt from "bcrypt";

const UsersController = {
  getAll: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });

      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro ao listar usuários.",
        error: error.message,
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;

      if (req.user.id !== id) {
        return res.status(403).json({
          success: false,
          message: "Usuário não tem permissão para realizar a consulta"
        })
      }

      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro ao buscar usuário.",
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password, role } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      const updatedData = {};

      if (name !== undefined) updatedData.name = name;
      if (email !== undefined) updatedData.email = email;
      if (role !== undefined) updatedData.role = role;

      if (password && password.trim()) {
        updatedData.password = await bcrypt.hash(password, 10);
      }

      user.set(updatedData);
      await user.save();

      res.status(200).json({
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

      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  updateFirsTimePassword: async (req, res) => {
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

      if (req.user.firstTime === true) {
        updatedData.firstTime = false;
      }

      if (password && password.trim()) {
        updatedData.password = await bcrypt.hash(password, 10);
      }

      user.set(updatedData);
      await user.save();

      res.status(200).json({
        success: true,
        message: "Perfil atualizado com sucesso!",
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await User.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Usuário removido com sucesso!",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro ao excluir usuário.",
      });
    }
  },
};

export default UsersController;