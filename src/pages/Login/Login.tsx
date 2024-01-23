import './Login.scss'
import {ReactElement, useEffect, useState} from 'react'
import LoginImage from '../../assets/images/login.jpeg'
import BaseCard from '../../components/Card/BaseCard'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import {Link} from "react-router-dom";
import {useAuthentication} from '../../hooks/useAuthentication'
import {IconButton} from "@mui/material";

const Login = (): ReactElement => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const [showPassword, setShowPassword] = useState(false)

    const { signIn, error: authError, loading, message } = useAuthentication()

    console.log(authError, '<<<')
    useEffect(() => {
        console.log(authError)
        setError(authError)
    }, [authError])

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signIn({ email, password })
    }

    return (
        <BaseCard className="Login">
            <h1>Login</h1>

            <h2>Log in to create posts and share it with your friends!</h2>
            <main>
                <img src={ LoginImage } alt="login-image"/>

                <form onSubmit={ handleSubmit }>
                    <TextField value={ email } type="email" label="Email" variant="standard" onChange={ (e) => setEmail(e.target.value) }/>
                    <TextField
                        value={ password }
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    style={{ color: 'white' }}
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={ showPassword ? 'fa fa-eye' : 'fa fa-eye-slash' }></i>
                                </IconButton>
                            )
                        }}
                       type={ showPassword ? 'text' : 'password' }
                       label="Password"
                       variant="standard"
                       onChange={ (e) => setPassword(e.target.value) }
                    />
                    {!loading && <Button type="submit" variant="contained">Log in</Button>}
                    {loading && <LoadingButton loading type="submit" variant="contained">Loading...</LoadingButton>}
                    <p>Do not have account yet? <Link style={{ color: '#1466C1' }} to="/register">Click here to create!</Link> </p>
                </form>
            </main>
            {message && (
                <>
                    <p className="message">{message} Didn't find it? <a href="">Click here to resend.</a></p>
                </>
            )}
            {error && <p className="error" dangerouslySetInnerHTML={{ __html: error }}></p>}
        </BaseCard>
    )
}

export default Login