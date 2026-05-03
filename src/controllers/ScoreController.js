import { Score, Enrollment, Student, User, Class } from "../models/Index.js";

const ScoreController = {
  getAllScores: async (req, res) => {
    try {
      const resultado = await Score.findAll({
        include: {
          model: Enrollment,
          as: "enrollment",
          include: [
            {
              model: Student,
              as: "student",
              include: {
                model: User,
                as: "user",
                attributes: { exclude: ["password"] },
              },
            },
            {
              model: Class,
              as: "class",
              attributes: ["id", "name", "year", "semester"],
            },
          ],
        },
      });

      res.status(200).json({ success: true, data: resultado });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao listar notas.",
        error: err.message,
      });
    }
  },

  getScoresByEnrollment: async (req, res) => {
    try {
      const { id } = req.params;

      const scores = await Score.findAll({
        where: { enrollment_id: id },
      });

      res.status(200).json({ success: true, data: scores });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao buscar notas.",
        error: err.message,
      });
    }
  },

  getScoresByTeacher: async (req, res) => {
  try {
    const scores = await Score.findAll({
      include: [
        {
          model: Enrollment,
          as: "enrollment",
          required: true,
          include: [
            {
              model: Class,
              as: "class",
              required: true,
              where: {
                professor_id: req.user.id,
              },
              attributes: ["id", "name"],
            },
            {
              model: Student,
              as: "student",
              include: {
                model: User,
                as: "user",
                attributes: { exclude: ["password"] },
              },
            },
          ],
        },
      ],
    });

    res.status(200).json({ success: true, data: scores });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Erro ao buscar notas do professor.",
      error: err.message,
    });
  }
},

  createScore: async (req, res) => {
    try {
      const { enrollment_id, assessment, value } = req.body;

      const resultado = await Score.create({
        enrollment_id,
        assessment,
        value,
      });

      res.status(201).json({
        success: true,
        message: "Nota adicionada com sucesso!",
        data: resultado,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao criar nota.",
        error: err.message,
      });
    }
  },

  updateScore: async (req, res) => {
    try {
      const { id } = req.params;

      const score = await Score.findByPk(id);

      if (!score) {
        return res.status(404).json({
          success: false,
          message: "Nota não encontrada.",
        });
      }

      await score.update(req.body);

      res.status(200).json({
        success: true,
        message: "Nota atualizada com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar nota.",
        error: err.message,
      });
    }
  },

  deleteScore: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Score.destroy({
        where: { id },
      });

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Nota não encontrada.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Nota removida com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao deletar nota.",
        error: err.message,
      });
    }
  },
};

export default ScoreController;
