import { updateProfile, updateEmail } from 'firebase/auth'
import { useAuthentication } from './useAuthentication'
import { useState } from 'react'
import {doc, updateDoc, getDocs, collection, where} from 'firebase/firestore'
import { db } from '../firebase/config.ts'

export const useUserUpdate = () => {
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const { auth } = useAuthentication()

	const updateUser = async (data) => {
		setLoading(true)
		setError('')

		try {
			console.log('data', data)
			await updateProfile(auth.currentUser, data)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const updateDBUser = async (data, userId) => {
		setLoading(true)
		setError('')

		try {
			const querySnapshot = await getDocs(collection(db, 'users'), where('uid', '==', userId));

			if (querySnapshot.size > 0) {
				const docId = querySnapshot.docs[0].id
				const docRef = doc(db, 'users', docId)

				await updateDoc(docRef, { ...data })
			} else {
				throw new Error(`Nothing document to id: ${userId}`)
			}
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const updateDBEmailUser = async (data, userId) => {
		setLoading(true)
		setError('')

		try {
			const docRef = doc(db, 'users', userId)
			await updateDoc(
				docRef,
				{ email: data.email }
			)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const updateEmailUser = async (email) => {
		setLoading(true)

		try {
			await updateEmail(auth.currentUser, email)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return {
		error,
		loading,
		updateDBEmailUser,
		updateDBUser,
		updateUser,
		updateEmailUser
	}
}