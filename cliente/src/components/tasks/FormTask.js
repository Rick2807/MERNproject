import React,{ useContext, useState, useEffect } from 'react'
import {ProjectContext} from '../../context/ProjectContext'
import TasksContext from '../../context/tasks/tasksContext'

const FormTask = () => {

    //get project context 
    const projectContext = useContext(ProjectContext)
    const { project } = projectContext

    //get taskContext
    const tasksContext = useContext(TasksContext)
    const { errorTask,
         selectedTask, 
         addTasks, 
         validateTask, 
         getTasks, 
         updateTask,
         cleanTask } = tasksContext

    //this will detect if there's a task selected
    useEffect(()=>{
        if(selectedTask !== null){
            setTask(selectedTask)
        }else{
            setTask({
                nombre: ''
            })
        }
    },[selectedTask])


    //form state
    const [task, setTask] = useState({
        nombre: '',
    })
    //get name from form state
    const {nombre} = task

    if(!project) return null
    //get the currentProject
    const [currentProject] = project; 

    // Read values from form 
    const handleChange = e =>{
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();

        //validate
        if(nombre.trim() ===''){
            validateTask(); 
            return 
        }

        //check to see if it is a new task o editing
        if(selectedTask === null){
            //add new task to taskState
            task.proyecto = currentProject._id
            addTasks(task)
        } else {
            updateTask(task)
            cleanTask()
        }

        

        //get tasks of current project
        getTasks(task.proyecto)

        //restart form 
        setTask({
            nombre: ''
        })
    }

    return (
        <div className="formulario">
            <form 
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                        />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit" 
                        className="btn btn-primario btn-submit btn-block"
                        value={selectedTask ? "Edit Task": "Add Task"}/>
                </div>
            </form>
            {errorTask && <p className="mensaje error">This field cannot be empty</p>}
        </div>
    )
}

export default FormTask
