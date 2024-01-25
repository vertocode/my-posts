import { collection, onSnapshot, query, where, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../firebase/config.ts'
import { useState } from 'react'

export const useUserCollection = () => {
	const [currentUser, setCurrentUser] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const getUserById = async (id: string) => {
		setCurrentUser('')
		setLoading(true)

		try {
			const q = query(collection(db, 'users'), where('uid', '==', id))

			onSnapshot(q, (querySnapshot) => {
				const data = querySnapshot.docs.map((doc) => doc.data())
				console.log(data)
				setCurrentUser(data.length > 0 ? data.at(0) : {})
			})
		} catch (e) {
			setError(e.message)
		} finally {
			setLoading(false)
		}

		return currentUser
	}

	const createUser = async (data) => {
		setLoading(true)
		try {
			console.log('creating user...')
			const newUser = { ...data, createdAt: Timestamp.now() }
			const createUserResponse = await addDoc(
				collection(db, 'users'),
				newUser
			)
			console.log(createUserResponse)

		} catch (error) {
			console.log('faile to create...')
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	return {
		user: currentUser,
		loading,
		error,
		createUser,
		getUserById
	}
}