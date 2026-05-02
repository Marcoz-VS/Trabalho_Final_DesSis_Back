import { Schedule, Class, Enrollment } from "../models/Index.js";
import { Op } from "sequelize";

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

      return res.status(200).json({
        success: true,
        data: schedules,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Erro ao listar horários.",
        error: err.message,
      });
    }
  },

  getScheduleByStudent: async (req, res) => {
   try{
      const { id } = req.params;

    const schedules = await Schedule.findAll({
      include: [
        {
          model: Class,
          as: "class",
          required: true,
          include: [
            {
              model: Enrollment,
              as: "enrollments",
              where: { student_id: id },
              attributes: []
            }
          ]
        }
      ]
    });

    res.json({ success: true, data: schedules });
   }catch(err){
    res.status(500).json({ error: err.message });
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

      return res.status(200).json({
        success: true,
        data: schedule,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Erro ao buscar horário.",
        error: err.message,
      });
    }
  },

  createSchedule: async (req, res) => {
    try {
      const { class_id, subject, day_of_week, start_time, end_time } = req.body;

      const classExist = await Class.findByPk(class_id);

      if (!classExist) {
        return res.status(404).json({
          success: false,
          message: "Turma não encontrada.",
        });
      }

      // conflito real de horário (overlap)
      const conflict = await Schedule.findOne({
        where: {
          class_id,
          day_of_week,
          [Op.and]: [
            { start_time: { [Op.lt]: end_time } },
            { end_time: { [Op.gt]: start_time } },
          ],
        },
      });

      if (conflict) {
        return res.status(409).json({
          success: false,
          message: "Conflito de horário nessa turma.",
        });
      }

      const schedule = await Schedule.create({
        class_id,
        subject,
        day_of_week,
        start_time,
        end_time,
      });

      return res.status(201).json({
        success: true,
        message: "Horário criado com sucesso!",
        data: schedule,
      });
    } catch (err) {
      return res.status(500).json({
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

      const updated = await schedule.update(req.body);

      return res.status(200).json({
        success: true,
        message: "Horário atualizado com sucesso!",
        data: updated,
      });
    } catch (err) {
      return res.status(500).json({
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

      return res.status(200).json({
        success: true,
        message: "Horário removido com sucesso!",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Erro ao deletar horário.",
        error: err.message,
      });
    }
  },
};

export default ScheduleController;