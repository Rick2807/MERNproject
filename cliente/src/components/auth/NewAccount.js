import React,{ useState, useContext, useEffect } from 'react'
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/authorization/authContext'

const NewAccount = (props) => {
   //create state 
   const [user, setUser] = useState({
    name: '',
    email: '', 
    password: '',
    confirm: ''
})
    //get all values from user state
    const {name, email, password, confirm} = user;

    //get alert and showAlert from context 
    const alertaContext = useContext(AlertaContext);
    const {alerta, showAlert} = alertaContext; 

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registerUser } = authContext


    // If user had already been registered 
    useEffect(()=> {
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

    //onsubmit function
    const onSubmit = e => {
        e.preventDefault(); 

        //Check to see if all fields are empty
        if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === ''){
            //prints error message
            showAlert('All fields are mandatory', 'alerta-error')
            return; 
        }
        //min pass length 6 chars 
        if(password.length < 6 ) {
            //prints error message
            showAlert('Password must be at least 6 characters in length', 'alerta-error')
            return;
        }

        //passwords must be the same 
        if(password !== confirm){
            //prints error message
            showAlert('Password does not match', 'alerta-error')
            return;
        }

        //Add values to main state. 
        registerUser({
            name,
            email, 
            password
        })
    }

    return (
        <div className="form-usuario">
            {alerta && (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>)}
            <div className="contenedor-form sombra-dark">
                <h1>Create New Account</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Name</label>
                        <input 
                            type="text"
                            name="name" 
                            id="name"
                            value={name}
                            placeholder="Tu Nombre"
                            onChange={onChange}/>
                    </div>

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
                        <label htmlFor="password">Confirm Password</label>
                        <input 
                            type="password"
                            name="confirm" 
                            id="confirm"
                            value={confirm}
                            placeholder="Confirm Password"
                            onChange={onChange}/>
                    </div>

                    <div className="campo-form">
                        <input type="submit" value="Sign up" className="btn btn-primario btn-block"/>
                    </div>
                </form>
                <Link to='/' style={{textDecoration: 'underline'}} className="enlace-cuenta">
                    back to log in
                </Link>
            </div>
        </div>
    )
}


export default NewAccount
