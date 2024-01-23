import { db } from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    sendEmailVerification
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('')
    const [message, setMessage] = useState(window.localStorage.getItem('message'))
    const [loading, setLoading] = useState(null)
    const [hasEmailSent] = useState(false)

    // deal with memory leaks
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    const checkIfIsCancelled = () => {
        if (cancelled) {
            return
        }
    }

    const resendEmailVerification = async (data: { email: string, password: string }) => {
        checkIfIsCancelled()

        setError('')
        setLoading(true)

        try {
            window.localStorage.setItem('message', `Email verification sent to "${currentUser?.email}"! Check your inbox for a verification link.`)
            await sendEmailVerification(currentUser)
        } catch (error) {
            window.localStorage.setItem('error', error.message)
            setError(error.message)
        }

        setLoading(false)
    }

    const createUser = async (data) => {
        checkIfIsCancelled()

        setError('')
        setLoading(true)

        let response

        try {
            response = await createUserWithEmailAndPassword(auth, data.email, data.password)
            console.log('response', response)

            await updateProfile(response.user, {
                displayName: data.displayName
            })
            await sendEmailVerification(auth.currentUser)
            window.localStorage.setItem('message', 'Account created successfully! You must verify your email before logging in. Check your inbox for a verification link.')
            await signOut(auth)
        } catch (error) {
            let message
            if (error.message.includes('email-already-in-use')) {
                message = 'The email address is already in use by another account. Please try again with a different email address.'
            }
            setError(message || error.message)
        }

        setLoading(false)
        return response
    }

    const signIn = async (data) => {
        checkIfIsCancelled()

        setError('')
        setLoading(true)
        setMessage('')
        window.localStorage.removeItem('message')

        let response
        try {
            response = await signInWithEmailAndPassword(auth, data.email, data.password)
            setCurrentUser(response.user)
            if (!response.user.emailVerified) {
                setError('Your account is inactive. Check your inbox for a verification link, and activate it. Didn\'t find it? <a href="">Click here to resend.</a>')
                await logout({ resetErrors: false })
            }
        } catch (error) {
            console.log(error)
            let errorMessage
            if (error.message.includes('invalid-credential')) {
                errorMessage = 'The provided email and password do not match any existing accounts in our system. Please double-check your credentials or consider creating a new account.'
            }
            setError(errorMessage || error?.message)
        }

        setLoading(false)
        return response
    }

    const logout = async ({ resetErrors = true }) => {
        checkIfIsCancelled()

        if (resetErrors) {
            setError('')
        }

        setLoading(true)

        try {
            await signOut(auth)
        } catch (error) {
            setError(error.message)
        }

        setLoading(false)
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        message,
        hasEmailSent,
        resendEmailVerification,
        createUser,
        signIn,
        logout,
        error,
        loading
    }
}
