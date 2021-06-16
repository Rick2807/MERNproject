const Project = require('../models/Project')
const {validationResult} = require('express-validator')

exports.createProject = async (req, res) =>{
    // revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
    try {
        // Create a new project 
        const project = new Project(req.body)

        //Save creator via JWT
        project.creador = req.user.id
        project.save()
        res.json(project)   

    } catch (error) {
        console.log(error)
    }

}


//get all projects of current user 
exports.getProjects = async (req, res) =>{
    try {
        const projects = await Project.find({creador: req.user.id}).sort({creado: -1})
        res.json({projects})
    } catch (error) {
        res.status(500).send('There was an error')
    }
}

//Update a project 
exports.updateProject = async (req,res) =>{
    // revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    //get projects info
    const {nombre} = req.body
    const newProject = {}

    if(nombre){
        newProject.nombre = nombre
    }

    try {
        
        //review the ID 
        let project = await Project.findById(req.params.id)
        //check if project exists 
        if(!project){
            return res.status(404).json({msg: 'Project Not Found'})
        }
        //check project creator
        if(project.creador.toString() !== req.user.id){
            return res.status(401).json({msg: 'No authorized'})
        }
        //update
        project = await Project.findOneAndUpdate({_id: req.params.id}, {$set: newProject}, {new: true})
        res.json({project})

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
}

//Delete a project by ID
exports.deleteProject = async (req, res) => {
    try {
        //review the ID 
        let project = await Project.findById(req.params.id)
        //check if project exists 
        if(!project){
            return res.status(404).json({msg: 'Project Not Found'})
        }
        //check project creator
        if(project.creador.toString() !== req.user.id){
            return res.status(401).json({msg: 'No authorized'})
        }

        //delete project 
        await Project.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Project Deleted'})


    } catch (error) {
        console.log(error)

        res.status(500).send('Internal Server Error')
   }
}