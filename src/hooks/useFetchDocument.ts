import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { FetchDocument } from '../types/FetchDocument.ts'

export const useFetchDocument = (docCollection: string, id: string): FetchDocument => {
	const [document, setDocument] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

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
			} catch (error: unknown) {
				setError(error?.message)
			}

			setLoading(false)
		}

		loadDocument()
	}, [cancelled, docCollection, document, id])

	useEffect(() => {
		setCancelled(true)
	}, [])

	return { document, error, loading }
}