import './Login.scss'
import {ReactElement, useEffect, useState} from 'react'
import LoginImage from '../../assets/images/login.jpeg'
import BaseCard from '../../components/Card/BaseCard'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import {Link} from "react-router-dom";
import {useAuthentication} from "../../hooks/useAuthentication.tsx";
import {useNavigate} from "react-router-dom";

const Login = (): ReactElement => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    const { signIn, error: authErrors, loading } = useAuthentication()
    const { navigate } = useNavigate()

    useEffect(() => {
        setError(authErrors)
    }, [authErrors])

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signIn({ email, password })

        if (!authErrors) {
            navigate('/')
        }
    }

    return (
        <BaseCard className="Login">
            <h1>Login</h1>

            <h2>Log in to create posts and share it with your friends!</h2>
            <main>
                <img src={ LoginImage } alt="login-image"/>

                <form onSubmit={ handleSubmit }>
                    <TextField type="email" label="Email" variant="standard" onChange={ (e) => setEmail(e.target.value) }/>
                    <TextField type="password" label="Password" variant="standard" onChange={ (e) => setPassword(e.target.value) } />
                    {!loading && <Button type="submit" variant="contained">Log in</Button>}
                    {loading && <LoadingButton type="submit" variant="contained">Loading...</LoadingButton>}
                    <p>Do not have account yet? <Link style={{ color: '#1466C1' }} to="/register">Click here to create!</Link> </p>
                </form>
            </main>
            {error && <p className="error">{error}</p>}
        </BaseCard>
    )
}

export default Login