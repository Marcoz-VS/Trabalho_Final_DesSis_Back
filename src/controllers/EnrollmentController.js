import { Enrollment, Class, Student, User } from "../models/index.js";

const EnrollmentController = {
  enrollStudent: async (req, res) => {
    try {
      const { student_id, class_id } = req.body;

      const student = await Student.findByPk(student_id);
      if (!student) {
        return res
          .status(404)
          .json({ success: false, message: "Estudante não encontrado" });
      }

      const classExist = await Class.findByPk(class_id);
      if (!classExist) {
        return res
          .status(404)
          .json({ success: false, message: "Turma não encontrada" });
      }

      const exists = await Enrollment.findOne({
        where: { student_id, class_id },
      });

      if (exists) {
        return res
          .status(400)
          .json({ success: false, message: "Aluno já matriculado" });
      }

      const enrollment = await Enrollment.create({
        student_id,
        class_id,
        status: "active",
      });

      res.status(201).json({ success: true, data: enrollment });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro interno ao matricular estudante.",
        error: err.message,
      });
    }
  },

  cancelEnrollment: async (req, res) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id)) {
        return res.status(400).json({ success: false, message: "ID inválido" });
      }

      const enrollment = await Enrollment.findByPk(id);

      if (!enrollment) {
        return res
          .status(404)
          .json({ success: false, message: "Matrícula não encontrada" });
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
