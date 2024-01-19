import './Register.scss'
import {ReactElement} from 'react'

import { useState, useEffect } from 'react'
import BaseCard from '../../components/Card/BaseCard'
import RegisterImage from '../../assets/images/register.jpeg'

import { useAuthentication } from '../../hooks/useAuthentication'

const Register = (): ReactElement => {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState()
    const [error, setError] = useState()

    const { createUser, error: authErrors, loading } = useAuthentication()

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
    }

    return (
        <BaseCard className="Register">
            <h1>Register</h1>

            <h2>Create your account to start posts and share it with your friends!</h2>

            <main>
                <img src={RegisterImage} alt="register-image"/>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Name: </span>
                        <input
                            value={displayName}
                            type="text"
                            name="displayName"
                            required
                            placeholder="Type your name"
                            onChange={e => setDisplayName(e.target.value)}
                        />
                    </label>

                    <label>
                        <span>Email: </span>
                        <input
                            value={email}
                            type="email"
                            name="displayEmail"
                            required
                            placeholder="Type your email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </label>

                    <label>
                        <span>Password: </span>
                        <input
                            value={password}
                            type="password"
                            name="displayPassword"
                            required
                            placeholder="Type your password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </label>

                    <label>
                        <span>Confirm Password: </span>
                        <input
                            value={confirmPassword}
                            type="password"
                            name="confirmPassword"
                            required
                            placeholder="Confirm your password"
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </label>


                    {!loading && <button className="btn">Register</button>}
                    {loading && <button className="btn" disabled>Registering...</button>}
                </form>
            </main>
            {error && <p className="error">{error}</p>}
        </BaseCard>
    )
}

export default Register