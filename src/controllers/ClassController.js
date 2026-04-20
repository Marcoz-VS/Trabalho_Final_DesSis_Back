import Class from '../models/Class.js'
import Joi from 'joi'

const classSchema = Joi.object({
  user_id: Joi.number().integer().required().messages({
    'number.base': 'user_id deve ser um número',
    'number.integer': 'user_id deve ser inteiro',
    'any.required': 'user_id é obrigatório'
  }),
});

const ClassController = {
  getAllClasses: async (req, res) => {
    try {
      const resultado = await Class.findAll({
      });
      res.status(200).json({ success: true, data: resultado });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao listar turmas.", error: error.message });
    }
  },
  getClassById: async (req, res) => {
    try{
      const { id } = req.params;
      const resultado = await Class.findByPk(id);

      if (!resultado) return res.status(404).json({ success: false, message: "Turma não encontrada." });

      res.status(200).json({ success: true, data: resultado });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar turma." });
    }
  },
  createClass : async (req, res) => {
    try{
        const {error, value} = classSchema.validate(req.body, {abortEarly: false})

              if (error) {
        return res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: error.details.map((detail) => detail.message),
        });
      }

        const { professor_id, description, name, year, semester } = value

        
    }catch(err){
    res.status(500).json({ success: false, message: "Erro ao criar turma." });
    }
  }
}