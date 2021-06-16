import React,{ useReducer } from 'react'
import {ProjectContext} from './ProjectContext'
import projectReducer from './projectReducer'

import {
     FORMULARIO_PROYECTO,
     OBTENER_PROYECTOS,
     AGREGAR_PROYECTO,
     VALIDATE_FORM, 
     PROYECTO_ACTUAL,
     ELIMINAR_PROYECTO,
     PROYECTO_ERROR
    }
from '../types/Index'
import axiosClient from '../config/axios'


//THIS COMPONENT IS USED TO SET VARS AND (FUNCTIONS) THAT ARE GOING TO BE CONSUMED BY ITS CHILDREN
const ProjectState = props => {
    //initialize state 
    const initialState = {
        projects:[],
        formulario: false,
        formError: false,
        project: null,
        mensaje: null

    }
    
    //initialize reducer 
    const [state, dispatch] = useReducer(projectReducer, initialState);

    //this function shows the formulary 
    const showForm = () => dispatch({type: FORMULARIO_PROYECTO})
    
    //this function fetches the projects 
    const getProjects = async () => {
        try {
            const result = await axiosClient.get('api/projects')
            const {data} = result

            dispatch({
                type: OBTENER_PROYECTOS, 
                payload: data.projects
            })
        } catch (error) {
            
            const alerta = {
                msg: 'Hubo un error', 
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }   
    }


    //this function adds project 
    const addProject = async project => {
      
      try {
        const result = await axiosClient.post('api/projects', project)
        //insert project to the state
        dispatch({
            type: AGREGAR_PROYECTO, 
            payload: result.data
        })
      } catch (error) {
        const alerta = {
            msg: 'Hubo un error', 
            categoria: 'alerta-error'
        }
        
        dispatch({
            type: PROYECTO_ERROR,
            payload: alerta
        })
    }
    }


    //this function will show an error message 
    const showError = () => {
        dispatch({type: VALIDATE_FORM})
    }


    //this function will get the object that was clicked 
    const currentProject = project => {
        dispatch({type: PROYECTO_ACTUAL, payload: project})
    }


    //this function will delete the project
    const deleteProject = async project =>{
        try {
           await axiosClient.delete(`/api/projects/${project}`)
           dispatch({type: ELIMINAR_PROYECTO, payload: project})
        } catch (error) {
            
            const alerta = {
                msg: 'Hubo un error', 
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }
    
    return (
        <ProjectContext.Provider
            value={{
                formError: state.formError,
                projects: state.projects, 
                formulario: state.formulario,
                project: state.project,
                mensaje: state.mensaje,
                showError,
                showForm,
                getProjects,
                addProject,
                currentProject,
                deleteProject
            }}
        >
                {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectState
