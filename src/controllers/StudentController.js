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

      res.status(200).json({ success: true, data: students });
    } catch (error) {
      res.status(500).json({
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

      res.status(200).json({ success: true, data: student });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro ao buscar estudante.",
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

      res.status(201).json({
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

      res.status(500).json({
        success: false,
        message: "Erro interno ao criar estudante.",
        error: err.message,
      });
    }
  },

  updateStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const { birth_date, phone, avatar_url } = req.body;

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Estudante não encontrado.",
        });
      }

      const updatedData = {};

      if (birth_date !== undefined) updatedData.birth_date = birth_date;
      if (phone !== undefined) updatedData.phone = phone;
      if (avatar_url !== undefined) updatedData.avatar_url = avatar_url;

      student.set(updatedData);
      await student.save();

      res.status(200).json({
        success: true,
        message: "Perfil de estudante atualizado com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar estudante.",
        error: err.message,
      });
    }
  },

  deleteStudent: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Student.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Estudante não encontrado.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Estudante removido com sucesso!",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro ao excluir estudante.",
      });
    }
  },
};

export default StudentController;
