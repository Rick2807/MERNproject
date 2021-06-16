import React, {useContext} from 'react'
import {ProjectContext} from '../../context/ProjectContext'
import TasksContext from '../../context/tasks/tasksContext'

const Project = ({project}) => {
    const projectContext = useContext(ProjectContext)
    const tasksContext = useContext(TasksContext)

    //obtain getTask function from tasksContext
    const { getTasks } = tasksContext

    const {currentProject} = projectContext; 

    //function to add the current task
    const selectTask = id => {
        currentProject(id)
        getTasks(id)
    }

    return (
        <li>
            <button
                className="btn btn-blank"
                onClick={()=> selectTask(project._id)}

            >{project.name}</button>
        </li>
    )
}

export default Project
