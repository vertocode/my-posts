import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'
import {useQuery} from "./useQuery.tsx"

export const useFetchDocuments = (docCollection: string, uid = null) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const queryRoute = useQuery()
    const search = queryRoute.get('q') || null

    // deal with memory leaks
    const [cancelled, setCancelled] = useState(false)


    useEffect(() => {
        async function loadData() {
            if (cancelled) return

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            try {
                let q

                if (search) {
                    q = await query(
                        collectionRef, where('tags', 'array-contains', search),
                        orderBy('createdAt', 'desc')
                    )
                } else {
                    q = await query(collectionRef, orderBy('createdAt', 'desc'))
                }

                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                })
            } catch (error) {
                setError(error.message)
            }
            setLoading(false)
        }

        loadData()
    }, [docCollection, search, uid, cancelled])

    useEffect(() => setCancelled(true), [])

    return { documents, error, loading, search }
}