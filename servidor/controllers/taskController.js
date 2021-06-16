const Tasks = require('../models/Tasks')
const Project = require('../models/Project')
const {validationResult} = require('express-validator')

exports.createTask = async (req, res) =>{
    //check if there are errors
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    
    try {

        //Destructure project and check if it exists 
        const {proyecto} = req.body

        const project = await Project.findById(proyecto);
        if(!project) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(project.creador.toString() !== req.user.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Creamos la tarea
        const task = new Tasks(req.body);
        await task.save();
        res.json({ task });

        console.log(project)

    } catch (error) {
        console.log(error)
        res.status(500).send('There was an error')
    }

}

exports.getTask = async (req, res) =>{
    
    try {
        //Destructure project and check if it exists 
        const {proyecto} = req.query

    

        const project = await Project.findById(proyecto)

        if(!project) {
            return res.status(404).json({msg: 'Project not found'})
        }

        //Check if current project belongs to the authenticated user
        if(project.creador.toString() !== req.user.id){
            return res.status(401).json({msg: 'No authorized'})
        }

        //Get the tasks by project
        const tasks = await Tasks.find({proyecto}).sort({creado: -1 })
        res.json({tasks})

    } catch (error) {
        console.log(error)
        res.status(500).send('There was an error')
    }
}

exports.updateTask = async (req, res) =>{ 
    try {

        //Destructure project and check if it exists 
        const {proyecto, nombre, estado} = req.body

        //weather task exists or not 
        let task = await Tasks.findById(req.params.id)
        
        if(!task){
            return res.status(401).json({msg: 'Task does not exist'})
        }

        //Get project 
        const project = await Project.findById(proyecto)

        //Check if current project belongs to the authenticated user
        if(project.creador.toString() !== req.user.id){
            return res.status(401).json({msg: 'No authorized'})
        }
        // Create an object with new info 
        const newTask = {}
        newTask.nombre = nombre
        newTask.estado = estado
        
        //Save Task

        task = await Tasks.findOneAndUpdate({_id: req.params.id}, newTask, {new: true})
        res.json({task})

    } catch (error) {
        console.log(error)

        res.status(500).send('Internal Server Error')
 
    }
}

exports.deleteTask = async (req, res) =>{ 
    try {

        //Destructure project and check if it exists 
        const {proyecto} = req.query

        //weather task exists or not 
        let task = await Tasks.findById(req.params.id)
        
        if(!task){
            return res.status(401).json({msg: 'Task does not exist'})
        }

        //Get project 
        const project = await Project.findById(proyecto)

        //Check if current project belongs to the authenticated user
        if(project.creador.toString() !== req.user.id){
            return res.status(401).json({msg: 'No authorized'})
        }
       //delete
       await Tasks.findOneAndRemove({_id: req.params.id})
       res.json({msg: 'Task Deleted'})

    } catch (error) {
        console.log(error)

        res.status(500).send('Internal Server Error')
 
    }
}