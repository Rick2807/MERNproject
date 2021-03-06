const mongoose = require('mongoose')

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    creador: {
       type: mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Proyectos', ProjectSchema)