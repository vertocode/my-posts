import { db } from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

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
        } catch (error) {
            console.log(error.message)
            setError(error.message)
        }

        setLoading(false)
    }

    const signIn = async (data) => {
        console.log(db)
        checkIfIsCancelled()

        setError('')
        setLoading(true)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
        } catch (error) {
            console.log(error.message)
            setError(error.message)
        }

        setLoading(false)
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        signIn,
        error,
        loading
    }
}
