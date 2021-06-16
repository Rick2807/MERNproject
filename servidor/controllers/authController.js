const User = require("../models/User")
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.authUser = async (req, res) => {
     // revisar si hay errores
     const errores = validationResult(req);
     if( !errores.isEmpty() ) {
         return res.status(400).json({errores: errores.array() })
     }

     // extraer email y password
     const { email, password } = req.body;


     try {
         // Revisar que el usuario registrado sea unico
        let user = await User.findOne({ email });
 
        if(!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        //revisar el password 
        const correctPass = await bcryptjs.compare(password, user.password);

        if(!correctPass) {
            return res.status(400).json({ msg: 'Wrong password' });
        }

        // Crear y firmar el JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        // firmar el JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            // Mensaje de confirmación
            res.json({ token  });
        });

        
     } catch (error) {
         console.log(error)
     }
}

//this function gets the user that's authenticated
exports.authedUser = async (req, res) =>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({user})
        
        
    } catch (error) {
        console.log(error)

        res.status(500).json({msg: 'There was an error!'})
    }
}