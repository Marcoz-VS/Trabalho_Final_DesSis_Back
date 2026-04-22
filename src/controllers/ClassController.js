import { Class, User } from "../models/Index.js";

const ClassController = {
  getAllClasses: async (req, res) => {
    try {
      const resultado = await Class.findAll({
        include: {
          model: User,
          as: "professor",
          attributes: ["id", "name"],
        },
      });

      const formatted = resultado.map((c) => {
        const obj = c.toJSON();

        if (!obj.professor) {
          obj.professor = {
          id: null,
          name: "Professor removido",
        }
      };

        return obj;
      });

      res.status(200).json({
        success: true,
        data: formatted,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro ao listar turmas.",
        error: error.message,
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

      const formatted = () => {
        if (!obj.professor) {
          obj.professor = {
          id: null,
          name: "Professor removido",
          }
        }
      };

      res.status(200).json({
        success: true,
        data: obj,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro ao buscar turma.",
      });
    }
  },

  createClass: async (req, res) => {
    try {
      const { professor_id, description, name, year, semester } = req.body;

      const professor = await User.findByPk(professor_id);

      if (!professor || professor.role !== "professor") {
        return res.status(404).json({
          success: false,
          message: "Professor inválido",
        });
      }

      const resultado = await Class.create({
        professor_id,
        description,
        name,
        year,
        semester,
      });

      res.status(201).json({
        success: true,
        message: "Turma criada com sucesso!",
        data: resultado,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao criar turma.",
        error: err.message,
      });
    }
  },

  updateClass: async (req, res) => {
    try {
      const { id } = req.params;

      const classExistente = await Class.findByPk(id);

      if (!classExistente) {
        return res.status(404).json({
          success: false,
          message: "Turma não encontrada.",
        });
      }

      const { name, semester, year, description, professor_id } = req.body;

      const dadosAtualizados = {};

      if (name !== undefined) dadosAtualizados.name = name;
      if (semester !== undefined) dadosAtualizados.semester = semester;
      if (year !== undefined) dadosAtualizados.year = year;
      if (description !== undefined) dadosAtualizados.description = description;
      if (professor_id !== undefined)
        dadosAtualizados.professor_id = professor_id;

      classExistente.set(dadosAtualizados);
      await classExistente.save();

      res.status(200).json({
        success: true,
        message: "Turma atualizada com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar turma.",
      });
    }
  },

  deleteClass: async (req, res) => {
    try {
      const { id } = req.params;

      const deletado = await Class.destroy({ where: { id } });

      if (!deletado) {
        return res.status(404).json({
          success: false,
          message: "Turma não encontrada.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Turma removida com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao deletar turma.",
      });
    }
  },
};

export default ClassController;
