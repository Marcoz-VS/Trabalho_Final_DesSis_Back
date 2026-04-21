import { Student, User } from "../models/index.js";

const StudentController = {
  getAllStudents: async (req, res) => {
    try {
      const resultado = await Student.findAll();

      res.status(200).json({ success: true, data: resultado });
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
      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({ success: false, message: "ID inválido" });
      }

      const resultado = await Student.findByPk(id);

      if (!resultado) {
        return res.status(404).json({
          success: false,
          message: "Estudante não encontrado.",
        });
      }

      res.status(200).json({ success: true, data: resultado });
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
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      const resultado = await Student.create({
        user_id,
        registration,
        birth_date,
        phone,
        avatar_url,
      });

      res.status(201).json({
        success: true,
        message: "Estudante criado com sucesso!",
        data: resultado,
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
      });
    }
  },

  updateStudent: async (req, res) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({ success: false, message: "ID inválido" });
      }

      const { birth_date, phone, avatar_url } = req.body;

      const studentExistente = await Student.findByPk(id);

      if (!studentExistente) {
        return res.status(404).json({
          success: false,
          message: "Estudante não encontrado.",
        });
      }

      studentExistente.set({ birth_date, phone, avatar_url });
      await studentExistente.save();

      res.status(200).json({
        success: true,
        message: "Perfil de estudante atualizado com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },

  deleteStudent: async (req, res) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({ success: false, message: "ID inválido" });
      }

      const deletado = await Student.destroy({ where: { id } });

      if (!deletado) {
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
