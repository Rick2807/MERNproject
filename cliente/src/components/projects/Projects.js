import React,{useContext, useEffect} from 'react'
import Aside from  '../layout/Aside'
import Bar from  '../layout/Bar'
import FormTask from '../tasks/FormTask'
import ListTasks from '../tasks/ListTasks'
import AuthContext from '../../context/authorization/authContext'

const Projects = () => {

    //get function that authorizes the user 
    const authContext = useContext(AuthContext)
    const {authedUser} = authContext


    //execute autheduser function to retrieve the projects 
    useEffect(()=>{
        authedUser() 
        //eslint-disable-next-line
    },[])

    return (
        
        <div className="contenedor-app">
            <Aside />
            
            <div className="seccion-principal">

            <Bar />

                <main>
                    <FormTask />

                    <div className="contenedor-tareas">
                        <ListTasks /> 
                    </div>

                </main>
            </div>
        </div>
    )
}

export default Projects
