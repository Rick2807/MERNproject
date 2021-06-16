import React,{ useReducer } from 'react'
import TasksContext from './tasksContext'
import tasksReducer from './tasksReducer'
import axiosClient from '../../config/axios'

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA, 
    LIMPIAR_TAREA
} from '../../types/Index'

const TasksState = props => {

    const initialState = {
        projectTask: [],
        errorTask: false,
        selectedTask: null
    }

    const [state, dispatch] = useReducer(tasksReducer, initialState)

    //create a function that gets all tasks 
    const getTasks = async proyecto => {
        try {
            const result = await axiosClient.get('/api/tasks', {params: {proyecto}})
            dispatch({
                type: TAREAS_PROYECTO,
                payload: result.data.tasks
            })
        } catch (error) {
            
        }
    }

    //create function that adds new tasks 
    const addTasks = async task =>{
       try {
        const result = await axiosClient.post('/api/tasks', task) 
        console.log(result)
        dispatch({
            type: AGREGAR_TAREA,
            payload: task
        })

       } catch (error) {
           console.log(error)
       }
    }

    //validate task function
    const validateTask = () =>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //eliminate task function
    const deleteTask = async (id,proyecto) => {
        try {
            await axiosClient.delete(`/api/tasks/${id}`,{params: {proyecto}})

            dispatch({
                type: ELIMINAR_TAREA, 
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Update Task function
    const updateTask = async task => {
        try {
            const result = await axiosClient.put(`/api/tasks/${task._id}`,task)
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: result.data.task
            })
        } catch (error) {
            
        }
    }

    // get a task to be edited
    const saveCurrentTask = task => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: task
        })
    }

    //clean task 
    const cleanTask = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
       <TasksContext.Provider 
        value={{
            projectTask: state.projectTask,
            errorTask: state.errorTask,
            selectedTask: state.selectedTask,
            getTasks,
            addTasks,
            validateTask,
            deleteTask,
            saveCurrentTask,
            updateTask,
            cleanTask
        }}
       >
           {props.children}
       </TasksContext.Provider>
    )
}

export default TasksState
