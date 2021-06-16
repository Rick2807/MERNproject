import React,{ useState, useContext } from 'react'
import {ProjectContext} from '../../context/ProjectContext'

const NewProject = () => {
    //declare project context 
    const projectContext = useContext(ProjectContext);
    //destructure form from main state
    const { formulario, formError, showForm, addProject, showError } = projectContext; 

    const [project, setProject] = useState({
        name: ''
    })

    //destructure name prop from object 
    const { name } = project; 

    //onChangeProject
    const onChangeProject = e => {
        
        setProject({
            ...project, 
            [e.target.name]: e.target.value
        })
    }

    // const onSubmit
    const onSubmit = e => {
        e.preventDefault();
        //validate project 
        if(name === '') { showError(); return; }
        //add to the state 
        addProject(project)
        //restart form 
        setProject({
            name: ''
        })
    }

    return (
        <>
            <button
            className="btn btn-block btn-primario"
            onClick={showForm}
        >
             New Project
            </button>
            {formulario &&
            <form 
                onSubmit={onSubmit}
                className="formulario-nuevo-proyecto">
                <input 
                    type="text"
                    className="input-text"
                    placeholder="Project Name"
                    name="name"
                    value={name}
                    onChange={onChangeProject}
                    />
                <input 
                    type="submit"
                    className="btn btn-block btn-primario"
                    value="Add Project"   
                    />
            </form>
            }
            {formError && <p className="mensaje error">This field should not be empty</p>}

        </>
    )
}

export default NewProject
