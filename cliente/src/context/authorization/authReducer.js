import {
    REGISTRO_EXISTOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXISTOSO,
    LOGIN_ERROR,
    CERRAR_SESION

} from '../../types/Index'

const authReducer = (state, action) =>{
    switch(action.type){

        case REGISTRO_EXISTOSO: 
        case LOGIN_EXISTOSO: 
            localStorage.setItem('token', action.payload.token);
            return {
                ...state, 
                autenticado: true,
                loading: false, 
                mensaje: null
            }
        case OBTENER_USUARIO: 
            return {
                ...state, 
                autenticado: true,
                loading: false, 
                usuario: action.payload
            }
        case CERRAR_SESION:
        case LOGIN_ERROR: 
        case REGISTRO_ERROR: 
            localStorage.removeItem('token')
            return {
                ...state, 
                usuario: null,
                autenticado: null,
                loading: false, 
                token: null, 
                mensaje: action.payload
            }

        default: 
            return state
    }
} 

export default authReducer