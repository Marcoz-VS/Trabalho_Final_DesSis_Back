import { Student, User } from "../models/Index.js";

const StudentController = {
  getAllStudents: async (req, res) => {
    try {
      const students = await Student.findAll({
        include: {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "role"],
        },
      });

      return res.status(200).json({
        success: true,
        data: students,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro ao listar estudantes.",
        error: error.message,
      });
    }
  },

  getStudentById: async (req, res) => {
    try {
      const { id } = req.params;

      const student = await Student.findByPk(id, {
        include: {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "role"],
        },
      });

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Estudante não encontrado.",
        });
      }

      return res.status(200).json({
        success: true,
        data: student,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro ao buscar estudante.",
        error: error.message,
      });
    }
  },

  createStudent: async (req, res) => {
    try {
      const { user_id, registration, birth_date, phone, avatar_url } = req.body;

      const user = await User.findByPk(user_id);

      if (!user || user.role !== "student") {
        return res.status(400).json({
          success: false,
          message: "Usuário inválido ou não é um estudante.",
        });
      }

      const student = await Student.create({
        user_id,
        registration,
        birth_date,
        phone,
        avatar_url,
      });

      return res.status(201).json({
        success: true,
        message: "Estudante criado com sucesso!",
        data: student,
      });
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
          success: false,
          message: "Registro ou usuário já cadastrado.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Erro interno ao criar estudante.",
        error: err.message,
      });
    }
  },

  updateStudent: async (req, res) => {
    try {
      const { id } = req.params;

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Estudante não encontrado.",
        });
      }

      await student.update(req.body);

      return res.status(200).json({
        success: true,
        message: "Perfil de estudante atualizado com sucesso!",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Erro ao atualizar estudante.",
        error: err.message,
      });
    }
  },

  deleteStudent: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Student.destroy({
        where: { id },
      });

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Estudante não encontrado.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Estudante removido com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro ao excluir estudante.",
        error: error.message,
      });
    }
  },
};

export default StudentController;
