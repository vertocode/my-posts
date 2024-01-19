import './Login.scss'
import {ReactElement} from 'react'
import LoginImage from '../../assets/images/login.jpeg'

const Login = (): ReactElement => {
    return (
        <div className="Login">
            <h1>Login</h1>
            <img src={ LoginImage } alt="login-image"/>
        </div>
    )
}

export default Login