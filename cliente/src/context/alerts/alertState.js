import React,{useReducer} from 'react'
import alertContext from './alertContext'
import alertReducer from './alertReducer'

import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
}from '../../types/Index'


//THIS COMPONENT IS USED TO SET VARS AND (FUNCTIONS) THAT ARE GOING TO BE CONSUMED BY ITS CHILDREN
const AlertState = props => {
    //initialize state 
    const initialState = {
        alerta: null 
    }
    const [state, dispatch] =  useReducer(alertReducer, initialState)

    // functions
    const showAlert = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg, 
                categoria
            }
        })
        //clean alert after 5 secs  w
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000);
    }


    return(
        <alertContext.Provider 
            value={{
                alerta: state.alerta,
                showAlert
            }}
        >
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState