import { useState, useEffect, useReducer } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
const initialState = {
    loading: null,
    error: null
};
const insertReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                error: null,
                loading: true
            };
        case 'INSERTED_DOC':
            return {
                loading: false,
                error: null
            };
        case 'ERROR':
            return {
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};
export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState);
    // deal with memory leaks
    const [cancelled, setCancelled] = useState(false);
    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    };
    const insertDocument = async (document) => {
        checkCancelBeforeDispatch({ type: 'LOADING' });
        console.log('1');
        try {
            const newDocument = { ...document, createdAt: Timestamp.now() };
            console.log('2');
            const insertedDocument = await addDoc(collection(db, docCollection), newDocument);
            console.log('3');
            checkCancelBeforeDispatch({ type: 'INSERTED_DOC', payload: insertedDocument });
        }
        catch (error) {
            console.log(error.message);
            checkCancelBeforeDispatch({ type: 'ERROR', payload: error.message });
        }
    };
    useEffect(() => {
        return () => {
            setCancelled(true);
        };
    });
    return { insertDocument, response };
};
