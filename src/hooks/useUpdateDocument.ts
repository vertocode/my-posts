import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config.ts'

export const useUpdateDocument = (docCollection) => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(null)

	const updateDocument = async (data, id) => {
		setLoading(true)

		try {
			const docRef = await doc(db, docCollection, id)
			await updateDoc(docRef, data)
		} catch (error) {
			setError(error.message)
		}

		setLoading(false)
	}

	return { updateDocument, error, loading }
}