import Enrollment from "../models/Enrollment.js";
import Class from "../models/Class.js"
import Student from "../models/Student.js"
import User from "../models/User.js"

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
     try{

      const { id } = req.params;

      const enrollments = await Enrollment.findAll({
        where: { student_id: id },
        include: {
          model: Class,
          as: 'class'
        }
      });

      if (!enrollments || enrollments.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Nenhuma matrícula encontrada para este estudante."
        });
      }

      res.status(200).json({
        success: true,
        data: enrollments
      });

     }catch(err){
     res.status(500).json({ success: false, message: "Erro interno ao verificar matricula do estudante." });
     }
    },

    getEnrollmentByClass: async (req, res) => {
        try{

    const {id} = req.params;

    const enrollments = await Enrollment.findAll({
        where: { class_id: id }, include: {model: Student, as: 'student', include: {model: User, as: 'user'}}});

      if (!enrollments || enrollments.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Nenhuma matrícula encontrada nesta turma."
        });
      }

      res.status(200).json({
        success: true,
        data: enrollments
      });

        }catch(err) {
     res.status(500).json({ success: false, message: "Erro interno ao verificar matriculas da turma." });
        }
    },

    cancelEnrollment: async (req, res) => {
        try{
         const {id} = req.params

         const deletado = await Enrollment.destroy({where: {student_id: id}})

      if (!deletado) return res.status(404).json({ success: false, message: "matricula de estudante não encontrada." });

      res.status(200).json({ success: true, message: "Estudante removido com sucesso!" });
      
        }catch(err){
     res.status(500).json({ success: false, message: "Erro interno ao cancelar matricula do estudante." });
        }
    }
}

export default RollmentController;