import './Login.scss'
import {ReactElement} from 'react'
import LoginImage from '../../assets/images/login.jpeg'
import BaseCard from '../../components/Card/BaseCard'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const Login = (): ReactElement => {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('login')
    }

    return (
        <BaseCard className="Login">
            <h1>Login</h1>

            <h2>Log in to create posts and share it with your friends!</h2>
            <main>
                <img src={ LoginImage } alt="login-image"/>

                <form onSubmit={ handleSubmit }>
                    <TextField type="email" label="Email" variant="standard" />
                    <TextField type="password" label="Password" variant="standard" />
                    <Button type="submit" variant="contained">Log in</Button>
                </form>
            </main>
        </BaseCard>
    )
}

export default Login