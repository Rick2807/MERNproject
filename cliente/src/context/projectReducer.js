import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO, 
    VALIDATE_FORM,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../types/Index'

const projectReducer = (state, action) => {
    switch(action.type){ 

        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            } 

        case OBTENER_PROYECTOS: 
            return {
                ...state, 
                projects: action.payload
            }

        case AGREGAR_PROYECTO: 
            return {
                ...state,
                projects: [...state.projects, action.payload],
                formulario: false,
                formError: null
            }

        case PROYECTO_ACTUAL: 
            return {
                ...state, 
                project: state.projects.filter(project => project._id === action.payload)
            }

        case ELIMINAR_PROYECTO: 
            return {
                ...state, 
                projects: state.projects.filter(project => project._id !== action.payload),
                project: null
            }

        case VALIDATE_FORM: 
            return {
                ...state, 
                formError: true
            }

        case PROYECTO_ERROR: 
            return {
                ...state,
                mensaje: action.payload
            }

        default: 
            return state;
    }
}

export default projectReducer