import React,{ useContext, useEffect, useRef } from 'react'
import Project from './Project'
import {ProjectContext} from '../../context/ProjectContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import alertContext from '../../context/alerts/alertContext'


const Listing = () => {
    //declare project context variable
    const projectContext = useContext(ProjectContext)
    const AlertContext = useContext(alertContext)
    
    //destructure projects from projectContext 
    const {projects, mensaje, getProjects} = projectContext 

    //destructure alert from alertContext 
    const {alerta, showAlert} = AlertContext

    //remove finDOMNode error
    const nodeRef = useRef(null);
    
    //get projects when components mounts 
    useEffect(() => {
        if (mensaje) {
            showAlert(mensaje.msg, mensaje.categoria)
        }

        getProjects();
        //eslint-disable-next-line
    }, [mensaje]);

    //check if project has something in it 
    if(projects.length === 0 ) return <p>There are no projects</p> 

    return (
        <ul className="listado-proyectos">
            {alerta && <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>}
            <TransitionGroup>
            {projects.map(project =>(
                <CSSTransition
                    nodeRef={nodeRef}
                    timeout={200}
                    classNames="tarea"
                    key={project._id}>
                    <Project
                      project={project}
                    />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ul>
    )
}

export default Listing
