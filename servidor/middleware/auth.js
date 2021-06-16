const jwt = require('jsonwebtoken');


module.exports = (req,res,next) => {
    //Read token from header
    const token = req.header('x-auth-token')
    // console.log(token)
    
    //Check if there's no token 
    if(!token) {
        res.status(401).json({msg: 'Access Denied'})
    }

    try {
        const cifrado = jwt.verify(token, process.env.SECRET)
        req.user = cifrado.user
        next()

    } catch (error) {
        res.status(401).json({msg: 'Token not valid!!'})
    }
}