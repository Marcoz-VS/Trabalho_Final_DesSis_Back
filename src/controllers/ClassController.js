import Class from '../models/Class.js'
import Joi from 'joi'


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

      const { professor_id, description, name, year, semester } = req.body

      const resultado = await Class.create({
           professor_id,
           description, 
           name, 
           year, 
           semester 
      });

      res.status(201).json({
        success: true,
        message: "Turma criada com sucesso!",
        data: resultado,
      });

        
    }catch(err){
    res.status(500).json({ success: false, message: "Erro ao criar turma." });
    }
  },

  updateClass: async (req, res) => {
    try{

     const { id } = req.params;
 
      const { name, semester, year, description, professor_id } = req.body

      const usuarioExistente = await Class.findByPk(id);
      if (!usuarioExistente) {
        return res.status(404).json({ success: false, message: "Turma não encontrada." });
      }

      const dadosAtualizados = { name, semester, year, description, professor_id };
    
      await Class.update(dadosAtualizados, { where: { id } });

      res.status(200).json({ success: true, message: "Turma atualizada com sucesso!" });  

    } catch(err){
    res.status(500).json({ success: false, message: "Erro ao atualizar turma." });      
    }
  },

  deleteClass: async (req, res) =>{
    try{
    const { id } = req.params

    const deletado = await Class.destroy({where: id})

    if (!deletado) return res.status(404).json({ success: false, message: "Turma não encontrada." });

      res.status(200).json({ success: true, message: "Turma removida com sucesso!" });
    }catch(err){
    res.status(500).json({ success: false, message: "Erro ao deletar turma." });         
    }
  }
}

export default ClassController;