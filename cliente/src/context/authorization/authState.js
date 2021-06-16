import React,{useReducer} from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import axiosClient from '../../config/axios'
import authToken from '../../config/authToken'

import {
    REGISTRO_EXISTOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXISTOSO,
    LOGIN_ERROR,
    CERRAR_SESION

} from '../../types/Index'

const AuthState = props =>{
    const initialState = { 
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        loading: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState)
    
    //Function that'll register a user  
    const registerUser = async data => {
         try {
            const answer = await axiosClient.post('/api/users', data)
            console.log(answer)

            dispatch({
                type: REGISTRO_EXISTOSO,
                payload: answer.data
            })

            //get the user 
            authedUser();

        } catch (error) {
            console.log(error.response.data.msg)
            const alerta = {
                msg: error.response.data.msg, 
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    //Return the authenticated user 
    const authedUser = async ()=>{
        const token = localStorage.getItem('token')
        //Function to send token through headers
        if (token) {
            authToken(token)
        }

        try {
            const answer = await axiosClient.get('/api/auth')
            const { data } = answer
            
            dispatch({
                type: OBTENER_USUARIO,
                payload: data.user
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    //this function will fire when the user signs in 
    const signInUser = async data =>{
        try {
            const answer = await axiosClient.post('api/auth', data)

            dispatch({
                type: LOGIN_EXISTOSO,
                payload: answer.data
            })

            //get the user 
            authedUser();

        } catch (error) {
            const alerta = {
                msg: error.response.data.msg, 
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    const signOutUser = () =>{
        dispatch({
            type:  CERRAR_SESION
        })
    }

    return(
        <AuthContext.Provider 
            value={{
                token: state.token, 
                autenticado: state.autenticado, 
                usuario: state.usuario,
                mensaje: state.mensaje,
                loading: state.loading,
                registerUser,
                authedUser,
                signInUser,
                signOutUser 
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
