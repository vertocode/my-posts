import './Register.scss'
import {ReactElement} from 'react'

import { useState, useEffect } from 'react'
import BaseCard from '../../components/Card/BaseCard'
import RegisterImage from '../../assets/images/register.jpeg'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField'

import { useNavigate } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'

const Register = (): ReactElement => {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState()
    const [error, setError] = useState()

    const { createUser, error: authErrors, loading } = useAuthentication()
    const navigate = useNavigate()

    useEffect(() => {
        setError(authErrors)
    }, [authErrors])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')

        const user = {
            displayName,
            email,
            password
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        await createUser(user)

        if (!authErrors) {
            navigate('/login')
        } else {
            setError(authErrors)
        }
    }

    return (
        <BaseCard className="Register">
            <h1>Register</h1>

            <h2>Create your account to start posts and share it with your friends!</h2>

            <main>
                <img src={RegisterImage} alt="register-image"/>

                <form onSubmit={handleSubmit}>
                    <TextField
                        value={displayName}
                        name="displayName"
                        required
                        type="text"
                        label="Name"
                        variant="standard"
                        onChange={e => setDisplayName(e.target.value)}
                    />

                    <TextField
                        value={email}
                        name="displayEmail"
                        required
                        type="email"
                        label="Email"
                        variant="standard"
                        onChange={e => setEmail(e.target.value)}
                    />

                    <TextField
                        value={password}
                        name="displayPassword"
                        required
                        type="password"
                        label="Password"
                        variant="standard"
                        onChange={e => setPassword(e.target.value)}
                    />

                    <TextField
                        value={confirmPassword}
                        name="confirmPassword"
                        required
                        type="password"
                        label="Confirm Password"
                        variant="standard"
                        onChange={e => setConfirmPassword(e.target.value)}
                    />


                    {!loading && <Button type="submit" variant="contained">Register</Button>}
                    {loading && <LoadingButton loading type="submit" variant="contained">Registering...</LoadingButton>}
                </form>
            </main>
            {error && <p className="error">{error}</p>}
        </BaseCard>
    )
}

export default Register