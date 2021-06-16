import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/authorization/authContext'


const Login = (props) => {
    //create state 
    const [user, setUser] = useState({
        email: '', 
        password: ''
    })

    const {email, password} = user

    //get alert and showAlert from context 
    const alertaContext = useContext(AlertaContext);
    const {alerta, showAlert} = alertaContext; 

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, signInUser } = authContext

    // If user had already been registered 
    useEffect(()=>{
        if(autenticado){
            props.history.push('/projects')
        }
        if(mensaje){
            showAlert(mensaje.msg, mensaje.categoria)
        }
        //eslint-disable-next-line
    },[mensaje, autenticado, props.history])

    //define onchange function 
    const onChange = e =>{
        setUser({
            ...user, 
            [e.target.name]: e.target.value
        })
    }

    //This function will execute when the user hits log in
    const onSubmit = e => {
        e.preventDefault();
        //validate input fields
        if(email.trim() === '' || password.trim() === '') {
            showAlert('All fields are mandatory', 'alerta-error')
            return 
        }

        signInUser({email, password})
    }

    return (
        <div className="form-usuario">
            {alerta && (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>)}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>
                <form
                    onSubmit={onSubmit}
                >

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            name="email" 
                            id="email"
                            value={email}
                            placeholder="Tu Email"
                            onChange={onChange}/>
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            name="password" 
                            id="password"
                            value={password}
                            placeholder="Tu Password"
                            onChange={onChange}/>
                    </div>

                    <div className="campo-form">
                        <input type="submit" value="Log in" className="btn btn-primario btn-block"/>
                    </div>
                </form>
                <Link to='/new-account' style={{textDecoration: 'underline'}} className="enlace-cuenta">
                    new account
                </Link>
            </div>
        </div>
    )
}

export default Login
