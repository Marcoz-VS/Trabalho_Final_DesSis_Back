import { Enrollment }  from "../models/Index.js";
import { Class } from "../models/Index.js"
import { Student } from "../models/Index.js"
import { User } from "../models/Index.js"

const RollmentController = {
    enrollStudent: async (req, res) => {
        try{
  const { student_id, class_id } = req.body;

  const exists = await Enrollment.findOne({
    where: { student_id, class_id }
  });

  if (exists) {
    return res.status(400).json({ message: 'Aluno já matriculado' });
  }

  const enrollment = await Enrollment.create({
    student_id,
    class_id
  });

  res.status(201).json(enrollment);         
        }catch(err){
     res.status(500).json({ success: false, message: "Erro interno ao matricular estudante." });
        }
    },

getEnrollmentByStudent: async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }

    const enrollments = await Enrollment.findAll({
      where: { student_id: id },
      include: {
        model: Class,
        as: 'class',
        attributes: ['id', 'name', 'year', 'semester']
      }
    });

    if (!enrollments.length) {
      return res.status(404).json({
        success: false,
        message: "Nenhuma matrícula encontrada para este estudante."
      });
    }

    res.status(200).json({ success: true, data: enrollments });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Erro interno ao verificar matrícula do estudante.",
      error: err.message
    });
  }
},

getEnrollmentByClass: async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }

    const enrollments = await Enrollment.findAll({
      where: { class_id: id },
      include: {
        model: Student,
        as: 'student',
        include: {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      }
    });

    if (!enrollments.length) {
      return res.status(404).json({
        success: false,
        message: "Nenhuma matrícula encontrada nesta turma."
      });
    }

    res.status(200).json({ success: true, data: enrollments });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Erro interno ao verificar matrículas da turma.",
      error: err.message
    });
  }
},

cancelEnrollment: async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID inválido"
      });
    }

    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Matrícula não encontrada"
      });
    }

    await enrollment.destroy();

    res.status(200).json({
      success: true,
      message: "Matrícula removida com sucesso!"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Erro interno ao cancelar matrícula",
      error: err.message
    });
  }
}
}

export default RollmentController;