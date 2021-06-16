import React, { useContext } from 'react'
import TasksContext from '../../context/tasks/tasksContext'
import {ProjectContext} from '../../context/ProjectContext'

const Task = ({task}) => {
    
    //get delete from tasksContext
    const tasksContext = useContext(TasksContext)
    const { getTasks, deleteTask, updateTask, saveCurrentTask } = tasksContext; 
    
    //get project from project context
    const projectContext = useContext(ProjectContext)
    const {project} = projectContext

    //get current project
    const [currentProject] = project

    //create a function that'll toggle task state
    const changeState = task =>{
        if(task.estado){
            task.estado = false
        }else{
            task.estado = true
        }

        updateTask(task)
    }
    
    return (
        <li className="tarea sombra">
            <p>{task.nombre}</p>

            <div className="estado">
                {task.estado 
                ?  
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={()=> changeState(task)}
                        >Completo</button>
                    )
                : 
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={()=> changeState(task)}
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">
                <button 
                    onClick={()=> saveCurrentTask(task)}
                    className="btn btn-primario"
                >Editar</button>

                <button 
                    className="btn btn-danger"
                    onClick={()=> {deleteTask(task._id, currentProject._id); getTasks(currentProject._id)}}
                    >Eliminar</button>
            </div>
        </li>
    )
}

export default Task
