const express = require('express')
const router = express.Router()

const projectsController = require('../controllers/projectsController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')

//create projects 
//api/projects
router.post('/',
auth,
[
    check('name','The name is mandatory').not().isEmpty()
],
projectsController.createProject
);

//get all projects 
router.get('/',
auth,
projectsController.getProjects
)

//update project via ID 
router.put('/:id', 
auth,
[
    check('nombre','The name is mandatory').not().isEmpty()
],
projectsController.updateProject
)

//update project via ID 
router.delete('/:id', 
auth,
projectsController.deleteProject
)

module.exports = router 