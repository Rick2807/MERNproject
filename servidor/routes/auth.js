//Routes to create users 
const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

//sign in  
//api/auth
router.post('/', 
    authController.authUser
);

//get the authenticated user 
router.get('/',
    auth, 
    authController.authedUser
)

module.exports = router; 