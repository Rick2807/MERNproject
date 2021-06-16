import React, {useContext, useRef} from 'react'
import {ProjectContext} from '../../context/ProjectContext'
import TasksContext from '../../context/tasks/tasksContext'

import Task from './Task'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListTasks = () => {
    //get project context variable
    const projectContext = useContext(ProjectContext)
    const {project, deleteProject } = projectContext;
    
    //get task from taskcontext 
    const tasksContext = useContext(TasksContext)
    const { projectTask } = tasksContext

     //remove finDOMNode error
     const nodeRef = useRef(null)
    

    //if project is null return an h2 
    if(!project) return <h2>Select a Project</h2>
    
    //destruture the first element on the array 
    const [currentProject] = project; 

    //Conditional Declaration
    const selectedProject = (currentProject) ? currentProject.name : 'Choose a project'; 

    return (
       <>
        <h2>Project: {selectedProject} </h2>
        <ul className="listado-tareas">
            { projectTask.length === 0
                ? <li className="tarea">There's no tasks</li>

                : 
                    <TransitionGroup>
                        {projectTask.map(task=>(
                            <CSSTransition 
                                nodeRef={nodeRef}
                                key={task._id}
                                timeout={200}
                                classNames="tarea"
                                >
                                <Task           
                                    task={task} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
            }
        </ul>

        <button 
            className="btn btn-danger"
            onClick={()=> deleteProject(currentProject._id)}
            
            >Eliminar Proyecto &times;
        </button>    
       </>
    )

}

export default ListTasks
