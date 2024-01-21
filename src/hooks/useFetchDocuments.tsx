import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // deal with memory leaks
    const [cancelled, setCancelled] = useState(false)
    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    useEffect(() => {
        async function loadData() {
            if (cancelled) return

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            try {
                let q
                q = await query(collectionRef, orderBy('createdAt', 'desc'))
                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                })
            } catch (error) {
                console.log(error.message)
                setError(error.message)
            }
            setLoading(false)
        }

        loadData()
    }, [docCollection, search, uid, cancelled])

    useEffect(() => setCancelled(true), [])

    return { documents, error, loading }
}