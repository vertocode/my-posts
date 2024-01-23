import { useState } from 'react'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config.ts";

export const useDeleteDocument = (docCollection, id) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const deleteDocument = async () => {
        setLoading(true)

        try {
            const docRef = await doc(db, docCollection, id)
            await deleteDoc(docRef)
        } catch (error) {
            setError(error.message)
        }

        setLoading(false)
    }

    return { deleteDocument, error, loading }
}