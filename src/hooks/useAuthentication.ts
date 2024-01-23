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

    const createUser = async (data) => {
        checkIfIsCancelled()

        setError('')
        setLoading(true)

        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password)

            await updateProfile(user, {
                displayName: data.displayName
            })
            await sendEmailVerification(auth.currentUser)
            window.localStorage.setItem('message', 'Account created successfully! You must verify your email before logging in. Check your inbox for a verification link.')
            await signOut(auth)
        } catch (error) {
            setError(error.message)
        }

        setLoading(false)
    }

    const signIn = async (data) => {
        console.log(db)
        checkIfIsCancelled()

        setError('')
        setLoading(true)
        setMessage('')

        let response
        try {
            response = await signInWithEmailAndPassword(auth, data.email, data.password)
            console.log(response.user)
            if (!response.user.emailVerified) {
                console.log('not verified')
                setError('Your account is inactive. Check your inbox for a verification link, and activate it.')
                console.log(error)
                await logout({ resetErrors: false })
            }
        } catch (error) {
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
        createUser,
        signIn,
        logout,
        error,
        loading
    }
}
