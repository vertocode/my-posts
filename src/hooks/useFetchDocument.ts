import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

export const useFetchDocument = (docCollection: string, id: string) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // deal with memory leaks
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        async function loadDocument() {
            if (cancelled && document) return

            setLoading(true)

            try {
                const docRef = await doc(db, docCollection, id)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    setDocument(docSnap.data())
                } else {
                    setError('Document does not exist.')
                }
            } catch (error) {
                setError(error.message)
            }

            setLoading(false)
        }

        loadDocument()
    }, [docCollection, id])

    useEffect(() => {
        setCancelled(true)
    }, [])

    return { document, error, loading }
}