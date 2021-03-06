const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async(req, res) =>{
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
 
         if(user) {
             return res.status(400).json({ msg: 'El usuario ya existe' });
         }
 
         // crea el nuevo usuario
         user = new User(req.body);
 
         // Hashear el password
         const salt = await bcryptjs.genSalt(10);
         user.password = await bcryptjs.hash( password, salt );
 
         // guardar usuario
         await user.save();
 
         // Crear y firmar el JWT
         const payload = {
             user: {
                 id: user.id
             }
         };
 
         // firmar el JWT
         jwt.sign(payload, process.env.SECRET, {
             expiresIn: 360000 // 1 hora
         }, (error, token) => {
             if(error) throw error;
 
             // Mensaje de confirmación
             res.json({ token  });
         });
 
 
     } catch (error) {
         console.log(error);
         res.status(400).send('Hubo un error');
     }

    
}