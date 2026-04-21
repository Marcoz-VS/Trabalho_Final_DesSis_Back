import Student from "../models/Student.js";

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
        
      const { user_id, registration, birth_date, phone, avatar_url} = req.body 

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
      
     const { birth_date, phone, avatar_url} = req.body

      const usuarioExistente = await Student.findByPk(id);
      if (!usuarioExistente) {
        return res.status(404).json({ success: false, message: "Estudante não encontrado." });
      }

      const dadosAtualizados = { birth_date, phone, avatar_url };
    
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