import { Enrollment, Class, Student, User } from "../models/Index.js";

const EnrollmentController = {
  enrollStudent: async (req, res) => {
    try {
      const { student_id, class_id } = req.body;

      const student = await Student.findByPk(student_id);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Estudante não encontrado",
        });
      }

      const classExist = await Class.findByPk(class_id);
      if (!classExist) {
        return res.status(404).json({
          success: false,
          message: "Turma não encontrada",
        });
      }

      const exists = await Enrollment.findOne({
        where: { student_id, class_id },
      });

      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Aluno já matriculado",
        });
      }

      const enrollment = await Enrollment.create({
        student_id,
        class_id,
        status: "active",
      });

      res.status(201).json({
        success: true,
        data: enrollment,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro interno ao matricular estudante.",
        error: err.message,
      });
    }
  },

  getEnrollmentByStudent: async (req, res) => {
    try {
      const { id } = req.params;

      const enrollments = await Enrollment.findAll({
        where: { student_id: id },
        include: {
          model: Class,
          as: "class",
          attributes: ["id", "name", "year", "semester"],
        },
      });

      if (!enrollments.length) {
        return res.status(404).json({
          success: false,
          message: "Nenhuma matrícula encontrada para este estudante.",
        });
      }

      res.status(200).json({
        success: true,
        data: enrollments,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao buscar matrículas do estudante.",
        error: err.message,
      });
    }
  },

  getEnrollmentByClass: async (req, res) => {
    try {
      const { id } = req.params;

      const enrollments = await Enrollment.findAll({
        where: { class_id: id },
        include: {
          model: Student,
          as: "student",
          include: {
            model: User,
            as: "user",
            attributes: ["id", "name", "email"],
          },
        },
      });

      if (!enrollments.length) {
        return res.status(404).json({
          success: false,
          message: "Nenhuma matrícula encontrada nesta turma.",
        });
      }

      res.status(200).json({
        success: true,
        data: enrollments,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao buscar matrículas da turma.",
        error: err.message,
      });
    }
  },

  cancelEnrollment: async (req, res) => {
    try {
      const { id } = req.params;

      const enrollment = await Enrollment.findByPk(id);

      if (!enrollment) {
        return res.status(404).json({
          success: false,
          message: "Matrícula não encontrada",
        });
      }

      enrollment.status = "inactive";
      await enrollment.save();

      res.status(200).json({
        success: true,
        message: "Matrícula cancelada com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro interno ao cancelar matrícula",
        error: err.message,
      });
    }
  },
};

export default EnrollmentController;
