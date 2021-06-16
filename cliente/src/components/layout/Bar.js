import React,{useContext, useEffect} from 'react'
import AuthContext from '../../context/authorization/authContext'

const Bar = () => {

     //get function that authorizes the user 
     const authContext = useContext(AuthContext)
     const {usuario, signOutUser , authedUser} = authContext
 
 
     //execute autheduser function to retrieve the projects 
     useEffect(()=>{
         authedUser() 
         //eslint-disable-next-line
     },[])

    return (
        <header className="app-header">
            {usuario && <p className="nombre-usuario">Hola <span>{usuario.name}</span></p>}
            <nav className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={signOutUser}
                >Sign Out</button>
            </nav>
        </header>
    )
}

export default Bar
