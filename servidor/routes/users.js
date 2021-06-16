//Routes to create users 
const express = require('express')
const router = express.Router()
const userController  = require('../controllers/userController')
const {check} = require('express-validator')

//create a user 
router.post('/', 
    [
        check('name', 'Name is mandatory').not().isEmpty(),
        check('email','Add a valid email').isEmail(),
        check('password','password must be 6 characters in length').isLength({min:5})
    ],
    userController.createUser
)

module.exports = router; 