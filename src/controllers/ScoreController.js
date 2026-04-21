import { Score } from '../models/Index.js';
import { Enrollment } from '../models/Index.js';
import { Student } from '../models/Index.js'
import {User} from "../models/Index.js"


const ScoreController = {
    getAllScore: async (req, res) => {
     try{
      const resultado = await Score.findAll({include: {model: Enrollment, as: 'enrollment', include: {model:Student, as: 'student', include: {model: User, as: 'user', attributes: { exclude: ["password_hash"] }}} }});
       res.status(200).json({ success: true, data: resultado });
     }catch(err){
      res.status(500).json({ success: false, message: "Erro ao listar notas.", error: err.message });
     }
    },
    createScore: async (req, res) => {
        try{
      const { enrollment_id, assessment, value } = req.body;

      const resultado = await Score.create({
      enrollment_id, 
      assessment, 
      value 
      })
      res.status(201).json({
        success: true,
        message: "Notas adicionadas com sucesso!",
        data: resultado,
      })
        }catch(err){
      res.status(500).json({ success: false, message: "Erro ao criar notas.", error: err.message });        
        }
    }
}

export default ScoreController;