import { Schedule, Class } from "../models/Index.js";

const ScheduleController = {
  getAllSchedules: async (req, res) => {
    try {
      const schedules = await Schedule.findAll({
        include: {
          model: Class,
          as: "class",
          attributes: ["id", "name", "year", "semester"],
        },
      });

      res.status(200).json({
        success: true,
        data: schedules,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao listar horários.",
        error: err.message,
      });
    }
  },

  getScheduleById: async (req, res) => {
    try {
      const { id } = req.params;

      const schedule = await Schedule.findByPk(id, {
        include: {
          model: Class,
          as: "class",
          attributes: ["id", "name"],
        },
      });

      if (!schedule) {
        return res.status(404).json({
          success: false,
          message: "Horário não encontrado.",
        });
      }

      res.status(200).json({
        success: true,
        data: schedule,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao buscar horário.",
        error: err.message,
      });
    }
  },

  createSchedule: async (req, res) => {
    try {
      const { class_id } = req.body;

      const classExist = await Class.findByPk(class_id);

      if (!classExist) {
        return res.status(404).json({
          success: false,
          message: "Turma não encontrada.",
        });
      }

      const schedule = await Schedule.create(req.body);

      res.status(201).json({
        success: true,
        message: "Horário criado com sucesso!",
        data: schedule,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao criar horário.",
        error: err.message,
      });
    }
  },

  updateSchedule: async (req, res) => {
    try {
      const { id } = req.params;

      const schedule = await Schedule.findByPk(id);

      if (!schedule) {
        return res.status(404).json({
          success: false,
          message: "Horário não encontrado.",
        });
      }

      await schedule.update(req.body);

      res.status(200).json({
        success: true,
        message: "Horário atualizado com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar horário.",
        error: err.message,
      });
    }
  },

  deleteSchedule: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Schedule.destroy({
        where: { id },
      });

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Horário não encontrado.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Horário removido com sucesso!",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao deletar horário.",
        error: err.message,
      });
    }
  },
};

export default ScheduleController;
