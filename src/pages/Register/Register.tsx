import './Register.scss'
import {ReactElement} from 'react'

import { useState, useEffect } from 'react'
import BaseCard from '../../components/Card/BaseCard'
import RegisterImage from '../../assets/images/register.jpeg'

const Register = (): ReactElement => {
    const handleSubmit = () => {

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
                        <input type="text" name="displayName" required placeholder="Type your name"/>
                    </label>

                    <label>
                        <span>Email: </span>
                        <input type="email" name="displayEmail" required placeholder="Type your email"/>
                    </label>

                    <label>
                        <span>Password: </span>
                        <input type="password" name="displayPassword" required placeholder="Type your password"/>
                    </label>

                    <label>
                        <span>Confirm Password: </span>
                        <input type="password" name="confirmPassword" required placeholder="Confirm your password"/>
                    </label>

                    <button className="btn">Register</button>
                </form>
            </main>
        </BaseCard>
    )
}

export default Register