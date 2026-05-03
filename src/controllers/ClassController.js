import { Class, User, Enrollment } from "../models/Index.js";

const fallbackProfessor = {
  id: null,
  name: "Professor removido",
};

const ClassController = {

getAllClasses: async (req, res) => {
  try {
    const { role, id, student } = req.user;

    let classes;

    // 🔓 ADMIN → vê tudo
    if (role === "admin") {
      classes = await Class.findAll();
    }

    // 👨‍🏫 PROFESSOR → só as dele
    if (role === "professor") {
      classes = await Class.findAll({
        where: { professor_id: id },
      });
    }

    // 👨‍🎓 STUDENT → só onde está matriculado
    if (role === "student") {
      if (!student) {
        return res.status(403).json({ message: "Usuário não é aluno" });
      }

      classes = await Class.findAll({
        include: [
          {
            model: Enrollment,
            as: "enrollments",
            where: { student_id: student },
            attributes: [],
          },
        ],
        distinct: true,
      });
    }

    return res.status(200).json({
      success: true,
      data: classes,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Erro ao listar turmas.",
      error: err.message,
    });
  }
},

  getClassById: async (req, res) => {
    try {
      const { id } = req.params;

      const resultado = await Class.findByPk(id, {
        include: {
          model: User,
          as: "professor",
          attributes: ["id", "name"],
        },
      });

      if (!resultado) {
        return res.status(404).json({
          success: false,
          message: "Turma não encontrada.",
        });
      }

      const obj = resultado.toJSON();

      if (!obj.professor) {
        obj.professor = fallbackProfessor;
      }

      return res.status(200).json({
        success: true,
        data: obj,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro ao buscar turma.",
        error: error.message,
      });
    }
  },

  createClass: async (req, res) => {
    try {
      const { professor_id } = req.body;

      const professor = await User.findByPk(professor_id);

      if (!professor || professor.role !== "professor") {
        return res.status(400).json({
          success: false,
          message: "Professor inválido.",
        });
      }

      const resultado = await Class.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Turma criada com sucesso!",
        data: resultado,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Erro ao criar turma.",
        error: err.message,
      });
    }
  },

  updateClass: async (req, res) => {
    try {
      const { id } = req.params;

      const turma = await Class.findByPk(id);

      if (!turma) {
        return res.status(404).json({
          success: false,
          message: "Turma não encontrada.",
        });
      }

      if (req.body.professor_id !== undefined) {
        const professor = await User.findByPk(req.body.professor_id);

        if (!professor || professor.role !== "professor") {
          return res.status(400).json({
            success: false,
            message: "Professor inválido.",
          });
        }
      }

      await turma.update(req.body);

      return res.status(200).json({
        success: true,
        message: "Turma atualizada com sucesso!",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Erro ao atualizar turma.",
        error: err.message,
      });
    }
  },

  deleteClass: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Class.destroy({
        where: { id },
      });

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Turma não encontrada.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Turma removida com sucesso!",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Erro ao deletar turma.",
        error: err.message,
      });
    }
  },
};

export default ClassController;
