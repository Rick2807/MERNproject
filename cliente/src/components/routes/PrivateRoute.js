import React,{useContext, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../../context/authorization/authContext'

const PrivateRoute = ({component: Component, ...props}) => {

   const authContext = useContext(AuthContext)
   const {autenticado, loading, authedUser} = authContext

    //execute autheduser function to retrieve the projects 
    useEffect(()=>{
        authedUser() 
        //eslint-disable-next-line
    },[])

    return (
        <Route {...props} render={props => !autenticado && !loading
            ? 
                <Redirect to="/" />
            :
                <Component {...props} /> } />
    )
}

export default PrivateRoute
