import Student from "../models/Student.js";
import Joi from 'joi'

const studentSchema = Joi.object({
  user_id: Joi.number().integer().required().messages({
    'number.base': 'user_id deve ser um número',
    'number.integer': 'user_id deve ser inteiro',
    'any.required': 'user_id é obrigatório'
  }),

  registration: Joi.string().min(3).max(50).required().messages({
    'string.base': 'registration deve ser texto',
    'string.empty': 'registration não pode ser vazio',
    'string.min': 'registration deve ter no mínimo 3 caracteres',
    'any.required': 'registration é obrigatório'
  }),

  birth_date: Joi.date().iso().optional().messages({
    'date.base': 'birth_date deve ser uma data válida',
    'date.format': 'birth_date deve estar no formato YYYY-MM-DD'
  }),

  phone: Joi.string().pattern(/^[0-9+\-\s()]+$/).optional().messages({
    'string.pattern.base': 'phone contém caracteres inválidos'
  }),

  avatar_url: Joi.string().uri().optional().messages({
    'string.uri': 'avatar_url deve ser uma URL válida'
  })
});

const updateStudentSchema = Joi.object({
  birth_date: Joi.date().iso(),
  phone: Joi.string(),
  avatar_url: Joi.string().uri()
});

const StudentController = {
  getAllStudents: async (req, res) => {
    try {
      const resultado = await Student.findAll({
      });
      res.status(200).json({ success: true, data: resultado });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao listar estudantes.", error: error.message });
    }
  },
  getStudentById: async (req, res) => {
    try{
      const { id } = req.params;
      const resultado = await Student.findByPk(id);

      if (!resultado) return res.status(404).json({ success: false, message: "Estudante não encontrado." });

      res.status(200).json({ success: true, data: resultado });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar estudante." });
    }
  },
        createStudent: async (req, res) => {
        try{ 
        const { error, value } = studentSchema.validate(req.body, { abortEarly: false });

      if (error) {
        return res.status(400).json({
          success: false,
          message: "Dados inválidos",
          errors: error.details.map((detail) => detail.message),
        });
      }

      const { user_id, registration, birth_date, phone, avatar_url} = value

      const resultado = await Student.create({
        user_id,
        registration,
        birth_date, 
        phone, 
        avatar_url,
      });

      res.status(201).json({
        success: true,
        message: "Você é um estudante !",
        data: resultado,
      })

        }catch(err){
      res
        .status(500)
        .json({
          success: false,
          message: "Erro interno ao criar estudante.",
        });
        }
    },
 
    updateStudent: async (req, res) => {
     try{
      const { id } = req.params;
      
      const { error, value } = updateStudentSchema.validate(req.body, { abortEarly: false });

      if (error) {
        return res.status(400).json({
          success: false,
          errors: error.details.map((d) => d.message),
        });
      }

     const { birth_date, phone, avatar_url} = value

      const usuarioExistente = await Student.findByPk(id);
      if (!usuarioExistente) {
        return res.status(404).json({ success: false, message: "Estudante não encontrado." });
      }

      const dadosAtualizados = { ...value };
    
      await Student.update(dadosAtualizados, { where: { id } });

      res.status(200).json({ success: true, message: "Perfil de estudante atualizado com sucesso!" });
     }catch(err){
            if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ success: false, message: "Registro ou conta de Usuário já cadastrada." });
      }
      res.status(500).json({ success: false, error: err.message });
     }
    },

    deleteStudent: async (req, res) => {
     try {

      const { id } = req.params;
      const deletado = await Student.destroy({ where: { id } });

      if (!deletado) return res.status(404).json({ success: false, message: "Estudante não encontrado." });

      res.status(200).json({ success: true, message: "Estudante removido com sucesso!" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao excluir Estudante." });
    }
  },
}

export default StudentController