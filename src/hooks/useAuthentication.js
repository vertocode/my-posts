import { db } from '../firebase/config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    // deal with memory leaks
    const [cancelled, setCancelled] = useState(false);
    const auth = getAuth();
    const checkIfIsCancelled = () => {
        if (cancelled) {
            return;
        }
    };
    const createUser = async (data) => {
        checkIfIsCancelled();
        setError('');
        setLoading(true);
        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(user, {
                displayName: data.displayName
            });
        }
        catch (error) {
            console.log(error.message);
            setError(error.message);
        }
        setLoading(false);
    };
    const signIn = async (data) => {
        console.log(db);
        checkIfIsCancelled();
        setError('');
        setLoading(true);
        let response;
        try {
            response = await signInWithEmailAndPassword(auth, data.email, data.password);
        }
        catch (error) {
            let errorMessage;
            if (error.message.includes('invalid-credential')) {
                errorMessage = 'The provided email and password do not match any existing accounts in our system. Please double-check your credentials or consider creating a new account.';
            }
            setError(errorMessage || error?.message);
        }
        setLoading(false);
        return response;
    };
    const logout = async () => {
        checkIfIsCancelled();
        setError('');
        setLoading(true);
        try {
            await signOut(auth);
        }
        catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };
    useEffect(() => {
        return () => setCancelled(true);
    }, []);
    return {
        auth,
        createUser,
        signIn,
        logout,
        error,
        loading
    };
};
