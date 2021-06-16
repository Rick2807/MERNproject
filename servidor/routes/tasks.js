const express = require('express')
const router = express.Router()

const taskController = require('../controllers/taskController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')

//create a new task
///api/tasks
router.post('/',
    auth, 
    [
        check('nombre','The name is mandatory').not().isEmpty(),
        check('proyecto','The project is mandatory').not().isEmpty()
    ],
    taskController.createTask
)
//get tasks
router.get('/',
    auth,
    taskController.getTask
)
// update tasks
router.put('/:id',
    auth,
    taskController.updateTask
)
// delete tasks
router.delete('/:id',
    auth,
    taskController.deleteTask
)

module.exports = router