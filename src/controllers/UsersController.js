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

  updateByAdmin: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      const updates = {};

      if (body.name !== undefined) {
        updates.name = String(body.name).trim();
      }
      if (body.email !== undefined) {
        updates.email = String(body.email).trim().toLowerCase();
      }
      if (body.role !== undefined) {
        updates.role = body.role;
      }
      if (body.password !== undefined && String(body.password).trim()) {
        updates.password = await bcrypt.hash(String(body.password).trim(), 10);
      }

      await user.update(updates);

      const fresh = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });

      return res.status(200).json({
        success: true,
        message: "Usuário atualizado.",
        data: fresh,
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

changePassword: async (req, res) => {
  try {
    const userId = req.user.id;
    const { current_password, new_password } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado."
      });
    }

    const isMatch = await bcrypt.compare(
      current_password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Senha atual incorreta."
      });
    }

    const newHash = await bcrypt.hash(new_password, 10);

    await user.update({ password: newHash });

    res.status(200).json({
      success: true,
      message: "Senha alterada com sucesso!"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Erro ao alterar senha",
      error: err.message
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
